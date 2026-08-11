import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const sendMessage = async ({ title, chatId }) => {
  const response = await api.post("/api/chat", { title, chat:chatId });
  return response.data;
};

export const getChatWithTitle = async () => {
  const response = await api.get("/api/chat");
  return response.data;
};

export const getMessagesWithCurrentChat = async (chatId) => {
  const response = await api.get(`/api/chat/${chatId}/messages`);
  return response.data;
};

export const deleteChat = async (chatId) => {
  const response = await api.delete(`/api/chat/delete/${chatId}`);
  return response.data;
};
