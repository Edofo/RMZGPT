import { useEffect } from "react";

import { useChat } from "@/contexts/ChatContext";

export const ChatWindow = () => {
  const { room, roomMessages, loadingMessage } = useChat();

  useEffect(() => {
    if (!roomMessages || !room) return;
    const chatWindow = document.querySelector(".overflow-y-auto");
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [room, roomMessages]);

  if (!room) return null;

  return (
    <div className="flex h-full flex-col bg-gray-900">
      <header className="sticky top-0 z-10 border-gray-800 border-b bg-gray-900 p-4">
        <h1 className="font-semibold text-gray-100 text-xl">
          Chat: {room.name}
        </h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <div className="space-y-4">
          {roomMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`group relative max-w-[85%] rounded-lg p-3 ${
                  message.sender === "me"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-100"
                }`}
              >
                <p className="break-words text-sm">{message.content}</p>
                <span className="mt-1 hidden text-right text-gray-400 text-xs group-hover:block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {loadingMessage && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg bg-gray-800 p-3">
                <p className="text-gray-100 text-sm">...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
