import di from "../di";
import ErrorCode from "../enum/ErrorCodes";
import { errorMessage } from "../model/error";
import { Message } from "../orm/entities/Message";
import { messageInput, messageResponse } from "./../model/message";

export class MessageService {
  async getAllMessages() {
    const messages = await di.db.manager.find(Message);
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
