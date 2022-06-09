import moment = require("moment");
import di from "../di";
import ErrorCode from "../enum/ErrorCodes";
import { errorMessage } from "../model/error";
import { Message } from "../orm/entities/Message";
import { messageInput, messageResponse } from "./../model/message";

export class MessageService {
  async alertUsers(alerts: Message[], sockets: any[]) {
    if (alerts.length > 0) {
      for (const alert of alerts)
        sockets.map((socket) => {
          socket.emit(alert);
        });
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
      message.date = moment(message.date).format();
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
    //const messages = await di.db.manager.find(Message);
    // if (messages.length === 0) {
    //   const error: errorMessage = {
    //     errorMessage: ErrorCode.NO_MESSAGES_FOUND,
    //     date: moment().format(),
    //   };
    //   return error;
    // }
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
    //TODO fix date validation
    // if (new Date(message.date) < new Date()) {
    //   const error: errorMessage = {
    //     errorMessage: ErrorCode.DATE_OLDER_THAN_TODAY,
    //     date: moment().format(),
    //   };
    //   return error;
    // }
  }
  async getMessagesByDate() {
    const date = moment().format();
    return await di.db.manager.find(Message, {
      where: { date: date },
    });
  }
}
