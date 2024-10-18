import { Send } from "lucide-react";

import { useChat } from "@/contexts/ChatContext";

export const MessageInput = () => {
  const { sendNewMessage, loadingMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = (e.target as HTMLFormElement).message.value;
    sendNewMessage(message);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-20 p-4 backdrop-blur-lg"
    >
      <div className="flex items-center space-x-2">
        <input
          id="message"
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-full bg-white bg-opacity-50 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
          disabled={loadingMessage}
        >
          <Send className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
};
