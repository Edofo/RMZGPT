export class Message {
  constructor(public content: string) {}

  isValid() {
    return this.content && this.content.trim().length > 0;
  }
}
