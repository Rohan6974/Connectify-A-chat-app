import React from "react";
import Navbar from "./Navbar";
import { ChatState } from "../context/context";
import { Box } from "@mui/material";
import Chats from "../Components/Chats";
import MessageBox from "../Components/MessageBox"


const ChatPage = () => {
  const { user } = ChatState();
  return (
    <Box style={{ height: "100vh", width: "100%", backgroundColor: "#282C34"  }}
    width={{ base: "120%", md: "120%" }}>
       {user && <Navbar />}
       

       <Box display="flex" style={{ height: "calc(100vh - 64px)" }} width={{ base: "120%", md: "100%" }} d={{ base: "none", md: "flex" }}>
        {user && <Chats />}
        {user && <MessageBox />}
      </Box>
     
    </Box>
  );
};

export default ChatPage;
