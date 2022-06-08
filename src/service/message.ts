import di from "../di";
import ErrorCode from "../enum/ErrorCodes";
import { errorMessage } from "../model/error";
import { Message } from "../orm/entities/Message";
import { messageInput, messageResponse } from "./../model/message";

export class MessageService {
  async deleteMessageById(id: string) {
    const message = await di.db.manager.delete(Message, id);
    console.log(message);
    if (message.affected == 0) {
      const error: errorMessage = {
        errorMessage: ErrorCode.NO_MESSAGE_FOUND,
        date: new Date(),
      };
      return error;
    }
    return;
  }
  async getMessageById(id: string) {
    const message = await di.db.manager.find(Message, { where: { id: id } });
    if (message.length === 0) {
      const error: errorMessage = {
        errorMessage: ErrorCode.NO_MESSAGE_FOUND,
        date: new Date(),
      };
      return error;
    }
    const messagesResponse: messageResponse = {
      messages: message,
    };
    return messagesResponse;
  }
  async getAllMessages() {
    const messages = await di.db.manager.find(Message);
    if (messages.length === 0) {
      const error: errorMessage = {
        errorMessage: ErrorCode.NO_MESSAGES_FOUND,
        date: new Date(),
      };
      return error;
    }
    const messagesResponse: messageResponse = {
      messages: messages,
    };
    return messagesResponse;
  }
  validateMessage(message: messageInput) {
    if (!message.message || !message.date) {
      const error: errorMessage = {
        errorMessage: ErrorCode.FIELDS_MISSING,
        date: new Date(),
      };
      return error;
    }
    if (new Date(message.date) < new Date()) {
      const error: errorMessage = {
        errorMessage: ErrorCode.DATE_OLDER_THAN_TODAY,
        date: new Date(),
      };
      return error;
    }
  }
  async createMessage(message: messageInput) {
    try {
      await di.db.manager.insert(Message, message);
      return message;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Fail message: ${err.message}`);
    }
  }
}
