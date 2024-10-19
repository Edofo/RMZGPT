import type { Message } from "../models/Message";

export class MessageService {
  async sendMessage(message: Message): Promise<string> {
    if (!message.isValid()) {
      throw new Error("Invalid message");
    }
    return message.content;
  }
}
