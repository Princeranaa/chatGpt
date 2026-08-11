import { initializeSocket } from "../service/chat.socket";
import {
  sendMessage,
  getChatWithTitle,
  getMessagesWithCurrentChat,
  deleteChat,
} from "../service/chat.api";
import { useDispatch } from "react-redux";
import { addNewMessage, createNewChat, setChats, setCurrentChatId, setLoading } from "../chat.slice";

export const useChat = () => {
  const dispatch = useDispatch();

  const handleSendMessage = async({ title, chatId }) => {
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
    dispatch(addNewMessage({
      chatId:chat._id,
      content:title,
      role:"user"
    }));

    dispatch(addNewMessage({
      chatId:chat._id,
      content:aiMessage.content,
      role:aiMessage.role
    }))

    dispatch(setCurrentChatId(chat._id));
    } catch (error) {
      console.log('error', error);
    }
  };

   /* (prev) => {
        return {
          ...prev,
          [chat._id]: {
            ...chat,
            messages: [{ content: title, role: "user" }, aiMessage],
          },
        };
      } */


  return {
    initializeSocket,
    handleSendMessage,
  };
};
