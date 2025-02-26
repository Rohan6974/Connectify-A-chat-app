import React, { useState } from "react";
import Navbar from "./Navbar";
import { ChatState } from "../context/context";
import { Box } from "@mui/material";
import Chats from "../Components/Chats";
import MessageBox from "../Components/MessageBox";

const ChatPage = () => {
  const { user , selectedchat } = ChatState();
  const [fetchAgain, setfetchAgain] = useState(false);
  return (
    <div style={{ width: "100%",}}>
      {user && <Navbar />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px" >
        {user && <Chats fetchAgain={fetchAgain}  />}
      </Box>
      <Box  
        display="flex"
        alignItems="end"
        justifyContent="end"
        width="92%"
        height="100vh"
        marginLeft={12}
        marginTop={"-250px"}
        
           >{
        selectedchat && (
          <MessageBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
        )
      }
       
      </Box>
    </div>
  );
};

export default ChatPage;
