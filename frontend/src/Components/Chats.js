import axios from "axios";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ChatState } from "../context/context";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  ListItem,
  Modal,
  Snackbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Chats = ({ fetchAgain }) => {
  const [loggeduser, setloggeduser] = useState();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchresult, setSearchresult] = React.useState([]);
  const [groupChatName, setGroupChatName] = React.useState("");
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, setuser, chats, setchats, selectedchat, setselectedchat } =
    ChatState();

  const getschats = async () => {
    try {
      const res = await axios.get("https://connectify-a-chat-app.onrender.com/chats", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setchats(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setloggeduser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  useEffect(() => {
    if (loggeduser) {
      getschats();
    }
  }, [loggeduser, fetchAgain]);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://connectify-a-chat-app.onrender.com/user?search=${search}`,
        config
      );
      setSearchresult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlesubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      return setOpenAlert(true);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const payload = {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)), // Ensure correct format
      };

      console.log("Sending payload:", payload);

      const { data } = await axios.post(
        "https://connectify-a-chat-app.onrender.com/chats/group",
        payload,
        config
      );

      console.log("Response received:", data);

      if (data) {
        setchats([data, ...chats]);
        handleClose();
        setGroupChatName("");
        setSelectedUsers([]);
      } else {
        console.log("No response received");
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  };

  const handleUser = (user) => {
    if (selectedUsers.includes(user)) {
      alert("User already added");
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };
  const getSender = (loggeduser, users) => {
    if (!Array.isArray(users) || users.length < 2 || !loggeduser) {
      return <CircularProgress />;
    }
  
    return users[0]._id === loggeduser._id ? users[1].name : users[0].name;
  };
  
  const handleDelete = async (deletuser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== deletuser._id));
  };
  return (
    <Box
      width={{ base: "100%", md: "31%" }}
      flexDirection="column"
      border={"3px solid #000"}
      borderRadius={3}
      marginTop={"70px"}
    >
      <Box
        display={{ base: selectedchat ? "none" : "flex", md: "flex" }}
        flexDirection="column"
        border={"1px solid grey"}
        borderRadius={3}
        bgcolor={"#fff"}
      >
        <Typography
          align="center"
          variant="h6"
          fontWeight="bold"
          padding={3}
          color={"#000"}
          marginRight={30}
        >
          Chats
        </Typography>

        <Button
          variant="contained"
          size="small"
          style={{
            margin: 15,
            width: "40%",
            display: "flex",
            marginLeft: "48%",
            marginTop: "-55px",
            backgroundColor: "#4caf50",
          }}
          onClick={handleOpen}
        >
          Group Chat
          <AddIcon />
        </Button>
      </Box>

      <Modal open={open}>
        <Box
          bgcolor={"#fff"}
          width={{ base: "100%", md: "40%" }}
          height={"40%"}
          borderRadius={3}
          p={3}
          marginLeft={"30%"}
          marginTop={"10%"}
          border={"3px solid #474b4e"}
          color={"#474b4e"}
        >
          <CloseIcon
            onClick={handleClose}
            style={{ float: "right" }}
            cursor={"pointer"}
            color="#474b4e"
          />
          <Typography
            align="center"
            variant="h6"
            fontWeight="bold"
            padding={3}
            color={"#474b4e"}
          >
            New Group Chat
          </Typography>
          <Divider style={{ color: "#474b4e" }} />

          <input
            type="text"
            placeholder="Group Name"
            style={{
              width: "70%",
              padding: "10px",
              marginBottom: "30px",
              marginLeft: "100px",
              marginTop: "20px",
              border: "1px solid #474b4e",
              borderRadius: "5px",
            }}
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Add Users"
            style={{
              width: "70%",
              padding: "10px",
              marginBottom: "30px",
              marginLeft: "100px",
              marginTop: "10px",
              border: "1px solid #474b4e",
              borderRadius: "5px",
            }}
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            size="small"
            style={{
              width: "20%",
              display: "flex",
              marginLeft: "400px",
            }}
            onClick={handlesubmit}
          >
            Create Group
          </Button>
          <Box display="flex" flexWrap="wrap" gap={2} marginBottom={4}>
            {selectedUsers.map((u) => (
              <Box
                key={u._id}
                fontSize={12}
                p={1}
                m={1}
                borderRadius={2}
                border={"1px solid #474b4e"}
                bgcolor={"#4caf50"}
                height={10}
              >
                <Typography color={"black"} marginTop={-1}>
                  {u.name}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  marginRight={5}
                  fontSize={10}
                  cursor={"pointer"}
                  color="#474b4e"
                >
                  <CloseIcon
                    onClick={() => handleDelete(u)}
                    style={{ float: "right", marginRight: "-70px" }}
                    cursor={"pointer"}
                    color="#474b4e"
                  />
                </Box>
              </Box>
            ))}
          </Box>

          {searchresult?.slice(0, 3).map((user) => (
            <ListItem
              key={user._id}
              onClick={() => handleUser(user)}
              style={{
                width: "55%",
                marginLeft: "80px",
                backgroundColor: "white",
                border: "1px solid #474b4e",
                borderRadius: "5px",
              }}
            >
              <Avatar src={user.pic} />
              <Typography
                style={{ marginLeft: "10px", color: "black", width: "75%" }}
              >
                {user.name}
              </Typography>
            </ListItem>
          ))}
        </Box>
      </Modal>

      <Box display="flex" flexDirection="column">
        {loggeduser &&
          Object.values(chats).map((chat) => (
            <Box
              key={chat._id}
              bgcolor={selectedchat === chat ? "#4caf50" : "#fff"}
            >
              <ListItem
                onClick={() => setselectedchat(chat)}
                style={{ cursor: "pointer" }}
                color={chat.isGroupChat ? "primary" : "secondary"}
              >
                <Avatar
                  src={
                    chat.isGroupChat
                      ? chat.groupAdmin?.pic
                      : chat.users?.find((user) => user._id !== loggeduser._id)
                          ?.pic || "link"
                  }
                />
                <Typography
                  variant="subtitle1"
                  style={{ marginLeft: 15, fontWeight: "bold" }}
                >
                  {chat.isGroupChat
                    ? chat.chatName
                    : getSender(loggeduser, chat.users)}
                </Typography>
              </ListItem>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Chats;
