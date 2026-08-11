import { initializeSocket } from "../service/chat.socket";
import {
  sendMessage,
  getChatWithTitle,
  getMessagesWithCurrentChat,
  deleteChat,
} from "../service/chat.api";
import { useDispatch } from "react-redux";
import {
  addMessages,
  addNewMessage,
  createNewChat,
  setChats,
  setCurrentChatId,
  setLoading,
} from "../chat.slice";

export const useChat = () => {
  const dispatch = useDispatch();

  const handleSendMessage = async ({ title, chatId }) => {
    try {
      dispatch(setLoading(true));
      const data = await sendMessage({ title, chatId });
      const { chat, aiMessage } = data;
      dispatch(
        createNewChat({
          chatId: chat._id,
          title: chat.title,
        }),
      );
      dispatch(
        addNewMessage({
          chatId: chat._id,
          content: title,
          role: "user",
        }),
      );

      dispatch(
        addNewMessage({
          chatId: chat._id,
          content: aiMessage.content,
          role: aiMessage.role,
        }),
      );

      dispatch(setCurrentChatId(chat._id));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleGetChats = async () => {
    try {
      dispatch(setLoading(true));

      const data = await getChatWithTitle();

      console.log("API RESPONSE:", data);

      const { chat } = data;

      console.log("API CHATS:", chat);

      const formattedChats = chat.reduce((acc, chat) => {
        acc[chat._id] = {
          id: chat._id,
          title: chat.title,
          messages: chat.messages || [],
          lastUpdate: chat.updatedAt,
        };

        return acc;
      }, {});

      dispatch(setChats(formattedChats));
    } catch (error) {
      console.log("Error getting chats:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOpenChat = async (chatId) => {
    const data = await getMessagesWithCurrentChat(chatId);
    const { messages } = data;
    const formattedMessage = messages.map((msg) => ({
      content: msg.content,
      role: msg.role,
    }));

    dispatch(
      addMessages({
        chatId,
        messages: formattedMessage,
      }),
    );

    dispatch(setCurrentChatId(chatId));
  };

  return {
    initializeSocket,
    handleSendMessage,
    handleGetChats,
    handleOpenChat
  };
};
