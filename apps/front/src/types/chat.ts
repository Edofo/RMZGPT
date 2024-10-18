export interface ChatRoom {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  content: string;
  sender: "me" | "them";
  timestamp: string;
}

export interface SendMessageRequest {
  message: string;
}

export interface SendMessageResponse {
  id: string;
  content: string;
}
