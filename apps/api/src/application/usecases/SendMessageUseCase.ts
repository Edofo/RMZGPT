import { Message } from "@/domain/models/Message";
import type { MessageRepository } from "@/interfaces/repositories/MessageRepository";

export class SendMessageUseCase {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(content: string) {
    const message = new Message(content);

    if (!message.isValid()) {
      throw new Error("Invalid message");
    }
    return this.messageRepository.sendMessage(message);
  }
}
