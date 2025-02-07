import axios from "axios";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ChatState } from "../context/context";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";

const Chats = () => {
  const [loggeduser, setloggeduser] = useState()
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchresult, setSearchresult] = React.useState([]);
  const [groupChatName, setGroupChatName] = React.useState("");
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, setuser, chats, setchats, selectedchat, setselectedchat } =
    ChatState();

  const getschats = async () => {
    try {
      const res = await axios.get("http://localhost:9438/chats", {
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
  }, [loggeduser]);

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
        `http://localhost:9438/user?search=${search}`,
        config
      );
      setSearchresult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlesubmit = async () => {}

  const handleAddUser = (user) => {}
  return (
    <Box
      width={{ base: "20%", md: "30%" }}
      display={{ base: selectedchat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      bgcolor={"#fff"}
      border={"3px solid #000"}
      borderRadius={3}
    >
      <Typography
        align="center"
        variant="h6"
        fontWeight="bold"
        padding={3}
        color={"#000"}
        marginRight={30}
      >
        My Chats
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
        New Group Chat
        <AddIcon />
      </Button>

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
          {searchresult?.slice(0, 3).map((user) => (
            <Button
              key={user._id}
              onClick={() => handleAddUser(user)}
              style={{
                display: "flex",
                width: "60%",
                padding: "10px",
                marginLeft: "60px",
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
            </Button>
          ))}

          <Box>
            <Button
              variant="contained"
              color="success"
              size="small"
              style={{
                margin: 15,
                width: "20%",
                display: "flex",
                marginLeft: "430px",
              }}
              onClick={handlesubmit}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>

      <Divider style={{ marginBottom: "10px", color: "#474b4e" }} />

      <List>
        {Array.isArray(chats) ? (
          chats.map((chat) => (
            <ListItem
              key={chat._id}
              onClick={() => setselectedchat(chat)}
              style={{ cursor: "pointer" }}
              color={chat.isGroupChat ? "primary" : "secondary"}
            >
              <Avatar
                src={chat.isGroupChat ? chat.chatPic : chat.users[1].pic}
              />
              <Typography
                variant="subtitle1"
                style={{ marginLeft: 15, fontWeight: "bold" }}
              >
                {chat.users[1].name}
              </Typography>
            </ListItem>
          ))
        ) : (
          <CircularProgress />
        )}
      </List>
    </Box>
  );
};

export default Chats;
