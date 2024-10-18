import { SendMessage } from "@/http/requests/chat/sendMessage";
import type { ChatRoom, Message } from "@/types/chat";
import type React from "react";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface ChatContextType {
  room: ChatRoom | undefined;
  roomMessages: Message[];
  sendNewMessage: (message: string) => Promise<void>;
  setRoom: (room: ChatRoom) => void;
  loadingMessage: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | undefined>(
    undefined,
  );
  const [roomMessages, setRoomMessages] = useState<Message[]>([]);
  const [loadingMessage, setLoadingMessage] = useState(false);

  const handleSelectRoom = useCallback((room: ChatRoom) => {
    setSelectedRoom(room);
  }, []);

  const handleSendMessage = useCallback(
    async (message: string) => {
      if (!selectedRoom) return;
      setLoadingMessage(true);
      const newMessage: Message = {
        id: Date.now().toString(),
        content: message,
        sender: "me",
        timestamp: new Date().toISOString(),
      };
      setRoomMessages((prevMessages) => [...prevMessages, newMessage]);

      const response = await SendMessage({ message });
      const newMessageBot: Message = {
        id: response.id,
        content: response.content,
        sender: "them",
        timestamp: new Date().toISOString(),
      };
      setRoomMessages((prevMessages) => [...prevMessages, newMessageBot]);
      setLoadingMessage(false);
    },
    [selectedRoom],
  );

  const value: ChatContextType = useMemo(
    () => ({
      room: selectedRoom,
      roomMessages: roomMessages,
      setRoom: handleSelectRoom,
      sendNewMessage: handleSendMessage,
      loadingMessage,
    }),
    [
      selectedRoom,
      roomMessages,
      handleSelectRoom,
      handleSendMessage,
      loadingMessage,
    ],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};
