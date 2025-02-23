import React, { useState } from "react";
import Navbar from "./Navbar";
import { ChatState } from "../context/context";
import { Box } from "@mui/material";
import Chats from "../Components/Chats";
import MessageBox from "../Components/MessageBox";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setfetchAgain] = useState(false);
  return (
    <div style={{ width: "100%", backgroundColor: "#282C34" }}>
      {user && <Navbar />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px" bgcolor={"#282C34"}>
        {user && <Chats fetchAgain={fetchAgain}  />}
      </Box>
      <Box
        sx={{
          width:{base:"20%", md:"66%"},
          justifyContent: "flex-end",
          position: "absolute",
          top: "80px",
          right: "10px",
          width: "66%",
          height: "96.5vh",
          border: "2px solid #4caf50",
          zIndex: "1",
          borderRadius: "10px",
        }}
      >
        {user && <MessageBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />}
      </Box>
    </div>
  );
};

export default ChatPage;
