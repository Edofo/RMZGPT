import api from "@/http/api";
import type { SendMessageRequest, SendMessageResponse } from "@/types/chat";

export const SendMessage = async (
  data: SendMessageRequest,
): Promise<SendMessageResponse> => {
  const response = await api.post("/send-message", data);
  if (response.status !== 201)
    return { id: new Date().toISOString(), content: "An error occurred" };
  return response.data;
};
