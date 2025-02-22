import React from "react";
import Navbar from "./Navbar";
import { ChatState } from "../context/context";
import { Box } from "@mui/material";
import Chats from "../Components/Chats";
import MessageBox from "../Components/MessageBox"


const ChatPage = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
    {user && <Navbar />}
    <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
      {user && <Chats/>}
      {user && (
        <MessageBox />
      )}
    </Box>
  </div>
  );
};

export default ChatPage;
