import moment = require("moment");
import di from "../di";
import ErrorCode from "../enum/ErrorCodes";
import { errorMessage } from "../model/error";
import { Message } from "../orm/entities/Message";
import { messageInput, messageResponse } from "./../model/message";
export class MessageService {
  async alertUsers(alerts: Message[], clients: any) {
    if (alerts.length > 0) {
      for (const message of alerts) {
        for (let client of clients) {
          client.sendText(JSON.stringify(message));
        }
      }
    }
  }
  async deleteMessageById(id: string) {
    const message = await di.db.manager.delete(Message, id);
    if (message.affected == 0) {
      const error: errorMessage = {
        errorMessage: ErrorCode.NO_MESSAGE_FOUND,
        date: moment().format(),
      };
      return error;
    }
    return;
  }
  async createMessage(message: messageInput) {
    try {
      message.date = moment(message.date).format("YYYY-DD-MM HH:mm");
      await di.db.manager.insert(Message, message);
      return message;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Fail message: ${err.message}`);
    }
  }
  async getMessageById(id: string) {
    const message = await di.db.manager.find(Message, { where: { id: id } });
    if (message.length === 0) {
      const error: errorMessage = {
        errorMessage: ErrorCode.NO_MESSAGE_FOUND,
        date: moment().format(),
      };
      return error;
    }
    const messagesResponse: messageResponse = {
      messages: message,
    };
    return messagesResponse;
  }
  async getAllMessages() {
    const messages = await di.db
      .createQueryBuilder(Message, "message")
      .cache(true)
      .getMany();

    const messagesResponse: messageResponse = {
      messages: messages,
    };

    return messagesResponse;
  }
  validateMessage(message: messageInput) {
    if (!message.message || !message.date) {
      const error: errorMessage = {
        errorMessage: ErrorCode.FIELDS_MISSING,
        date: moment().format(),
      };
      return error;
    }
  }
}
