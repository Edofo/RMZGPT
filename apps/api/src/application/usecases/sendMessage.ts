import { Message } from "../../domain/models/Message";
import type { MessageService } from "../../domain/services/MessageService";
import type { MessageRepository } from "../../interfaces/repositories/MessageRepository";

export class SendMessageUseCase {
  constructor(
    private messageService: MessageService,
    private messageRepository: MessageRepository,
  ) {}

  async execute(content: string) {
    const message = new Message(content);

    if (!message.isValid()) {
      throw new Error("Invalid message");
    }
    return this.messageRepository.sendMessage(message);
  }
}
