import { Message } from "../orm/entities/Message";

export class messageInput {
  id?: string;
  message: string;
  date: string;
}

export class messageResponse {
  messages: Message[];
}
