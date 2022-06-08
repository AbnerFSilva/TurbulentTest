import { Message } from "../orm/entities/Message";

export class messageInput {
  id?: string;
  message: string;
  date: Date;
}

export class messageResponse {
  messages: Message[];
}
