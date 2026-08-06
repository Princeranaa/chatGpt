import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { initializeSocket } from "../service/chat.socket";

const Dashboard = () => {
  const chat = useChat();

  const { user } = useSelector((state) => state.auth);
  console.log("User is here", user);

  useEffect(() => {
    chat.initializeSocket();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
