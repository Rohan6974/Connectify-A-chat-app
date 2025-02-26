import React, { useState } from "react";
import { ChatState } from "../context/context";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Typography,
} from "@mui/material";
import GroupChatModal from "../Miscellaneous/GroupChatModal";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";

const SingleChat = ({ fetchAgain, setfetchAgain }) => {
  const {user, selectedchat } = ChatState();
  const [messages, setmessages] = useState([]);
  const [loading, setloading] = useState(false);
  const [newmessage, setnewmessage] = useState("");

  const sendmessage = async(event) => {

    
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setloading(true);
      const { data } = await axios.post(
        "http://localhost:9438/messages",
        {
          content: newmessage,
          chatId: selectedchat._id,
        },
        config
      );
setnewmessage("");
      setmessages([...messages, data]);
      

      console.log(data);
      setloading(false);

 
  }
  const inputhandler = (e) => {
    setnewmessage(e.target.value);
  };
  return (
    <>
      {selectedchat ? (
        <>
          {selectedchat.isGroupChat && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#333",
                borderRadius: "8px",
                marginLeft: "800px",
              }}
            >
              <GroupChatModal
                fetchAgain={fetchAgain}
                setfetchAgain={setfetchAgain}
              />
            </Box>
          )}

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",

              minHeight: "400px",
              maxHeight: "600px",
            }}
          >
            
            {/* {messages.map((message) => (
              <Box
                key={message._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    message.sender._id === user._id ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <Box
                  sx={{
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor:  message.sender._id === user._id ? "#4caf50" : "#333",
                    color: message.sender._id === user._id ? "black" : "white",
                  }}
                >
                  <Typography>{message.content}</Typography>
                </Box>
              </Box>
            ))} */}
          </Box>
          
            <input
              type="text"
              placeholder="Type a message..."
              style={{
                width: "850px",
                padding: "10px",
                borderRadius: "10px",
                border: "2px solid #4caf50",
                backgroundColor: "black",
                color: "white",
                marginBottom: "10px",
                marginLeft:"-20px"
              }}
              onChange={inputhandler}
              value={newmessage}
            />
            <Button  onClick={sendmessage} style={{width :"30px", marginLeft:"870px" , marginTop:"-50px"}}><SendIcon color="#4caf50"/></Button>
          
        </>
      ) : (
        <Box sx={{ textAlign: "center", marginTop: 40 }}>
          <Typography color="#4caf50" fontFamily={"cursive"} fontSize={20}>
            Select a chat to start messaging
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
