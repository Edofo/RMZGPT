import { useEffect } from "react";

import { useChat } from "@/contexts/ChatContext";

export const ChatWindow = () => {
  const { room, roomMessages } = useChat();

  useEffect(() => {
    if (!roomMessages || !room) return;
    const chatWindow = document.querySelector(".flex-1");
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [room, roomMessages]);

  if (!room) return null;

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 mx-4 mt-4 bg-white bg-opacity-20 p-4 shadow-lg backdrop-blur-lg">
        <h1 className="font-bold text-3xl text-white">Chat: {room.name}</h1>
      </header>
      <div className="flex-1 space-y-4 overflow-y-auto p-4 pb-20">
        {roomMessages.map((message) => (
          <div
            key={message.id}
            // className={`max-w-xs mx-2 p-3 rounded-lg ${
            //   message.user.id === user?.id
            //     ? 'ml-auto bg-blue-500 text-white'
            //     : 'bg-white text-gray-800'
            // }`}
            className={
              "mx-2 ml-auto max-w-xs rounded-lg bg-blue-500 p-3 text-white"
            }
          >
            <p>{message.content}</p>
            <span className="text-xs opacity-75">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
