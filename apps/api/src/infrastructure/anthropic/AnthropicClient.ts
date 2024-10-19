import Anthropic from "@anthropic-ai/sdk";

export class AnthropicClient {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async sendMessage(
    content: string,
    model = "claude-3-5-sonnet-20240620",
    max_tokens = 1024,
  ) {
    const response = await this.client.messages.create({
      model,
      max_tokens,
      messages: [{ role: "user", content }],
    });

    return response;
  }
}
