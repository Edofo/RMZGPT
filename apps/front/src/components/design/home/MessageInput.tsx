import { useChat } from "@/contexts/ChatContext";
import { Send } from "lucide-react";

export const MessageInput = () => {
  const { sendNewMessage, loadingMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = (e.target as HTMLFormElement).message.value;
    if (message.trim()) {
      sendNewMessage(message);
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-gray-800 border-t p-4">
      <div className="flex items-center space-x-2">
        <input
          id="message"
          name="message"
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-md bg-gray-800 px-4 py-2 text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loadingMessage}
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
};
