import di from "../di";
import { Message } from "../orm/entities/Message";
import { messageInput } from "./../model/message";

export class MessageService {
  async createMessage(message: messageInput) {
    console.log("service");
    if (!message.message) {
      return;
    }
    console.log("service2");

    if (!message.date || message.date < new Date()) {
      return;
    }
    console.log("service3");

    try {
      console.log("service4");

      await di.db.manager.insert(Message, message);
      console.log("service5");

      return message;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Fail message: ${err.message}`);
    }
  }
}
