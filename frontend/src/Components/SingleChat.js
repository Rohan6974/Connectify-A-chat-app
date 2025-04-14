import React, { useEffect, useState } from "react";
import { ChatState } from "../context/context";
import { Avatar, Box, Button, Typography } from "@mui/material";
import GroupChatModal from "../Miscellaneous/GroupChatModal";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import "../Css/Singlechat.css";
import io from "socket.io-client";


const ENDPOINT = "http://localhost:9438";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setfetchAgain }) => {
  const { user, selectedchat } = ChatState();
  const [messages, setmessages] = useState([]);
  const [newmessage, setnewmessage] = useState("");
  const [socketConnected, setsocketConnected] = useState(false);
  const [typing, settyping] = useState(false);
  const [istyping, setistyping] = useState(false);

  const sendmessage = async () => {
    if (!newmessage.trim()) return;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:9438/messages",
        {
          content: newmessage,
          chatId: selectedchat._id,
        },
        config
      );

      socket.emit("new message", data);
      setnewmessage("");
      setmessages([...messages, data]);
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchMessages = async () => {
    if (!selectedchat) return;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `http://localhost:9438/messages/${selectedchat._id}`,
        config
      );
      setmessages(data);

      socket.emit("join chat", selectedchat._id);
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedchat;
  }, [selectedchat, fetchAgain]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setsocketConnected(true));
    socket.on("typing", () => setistyping(true));
    socket.on("stop typing", () => setistyping(false));
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      if (!selectedChatCompare ||selectedChatCompare._id !== newMessageRecieved.chat._id) {
        // give notification
      } else {
        setmessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setnewmessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      settyping(true);
      socket.emit("typing", selectedchat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedchat._id);
        settyping(false);
      }
    }, timerLength);

  }

  return (
    <div className="chat-container">
      {selectedchat ? (
        <>
          {selectedchat.isGroupChat ? (
            <div className="group-header">
              <GroupChatModal
                fetchAgain={fetchAgain}
                setfetchAgain={setfetchAgain}
              />
            </div>
          
        ) : (
          <Avatar
              src={selectedchat.users[1].pic}
              alt={selectedchat.isGroupChat ? selectedchat.name : user.name}
              className="avatar"
            />
        )}

          <div
            className="messages-container"
            style={{
              flex: 1,
              overflowY: "auto",
              maxHeight: "400px",
              padding: "10px",
            }}
          >
           
            {messages.map((message) => (
              <div
                key={message._id}
                className={`message ${
                  message.sender._id === user._id ? "sent" : "received"
                }`}
              >
                <Typography className="message-text">
                  {message.content}
                </Typography>
              </div>
            ))}
          </div>

          <div className="input-container">

            {istyping ? <div className="typing-indicator">Typing...</div> : (<></>)}
            <input
              type="text"
              placeholder="Type a message..."
              className="message-input"
              value={newmessage}
              onChange={typingHandler}
            />
            <Button onClick={sendmessage} className="send-button">
              <SendIcon />
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SingleChat;
