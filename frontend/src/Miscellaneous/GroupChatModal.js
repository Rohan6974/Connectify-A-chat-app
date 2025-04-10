import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItem,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { ChatState } from "../context/context";
import UserBadge from "./UserBadge";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const GroupChatModal = ({ fetchagain, setfetchagain }) => {
  const { user, selectedchat, chats, setchats, setselectedchat } = ChatState();
  const [groupName, setgroupName] = useState("");
  const [search, setSearch] = useState("");
  const [searchresult, setSearchresult] = useState([]);
  const [openAlert, setopenAlert] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-40%, -40%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleRemove = () => {};
  const handleRename = async () => {
    if (!groupName) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:9438/chats/grouprename",
        {
          chatId: selectedchat._id,
          chatName: groupName,
        },
        config
      );

      setchats(chats.map((c) => (c._id === data._id ? data : c)));
      setselectedchat(data);
      setfetchagain(!fetchagain);
    } catch (error) {
      <Snackbar open={openAlert} autoHideDuration={2}>
        <Alert onClose={() => setopenAlert(false)} severity="warning">
          User Not Found
        </Alert>
      </Snackbar>;
    }
    setgroupName("");
  };
  const handleAdd = async () => {

    if (selectedUsers.length === 0) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      for (const userToAdd of selectedUsers) {
        const { data } = await axios.put(
          "http://localhost:9438/chats/groupadd",
          {
            chatId: selectedchat._id,
            userId: userToAdd._id,
          },
          config
        );

        console.log("successfully added" + data);

        setselectedchat(data);
        setchats(chats.map((c) => (c._id === data._id ? data : c)));
      }

      setfetchagain(!fetchagain);
      setSelectedUsers([]);
    } catch (error) {
      alert("User Not Found");
    }
  };

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

  const handleUser = (user) => {
    if (selectedUsers.includes(user)) {
      alert("User already added");
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleDelete = async (deletuser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== deletuser._id));
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} fullWidth>
        <VisibilityIcon
          sx={{
            width: "900px",
            color: "#4caf50",
            cursor: "pointer",
            fontSize: "20px",
          }}
        />
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedchat.isGroupChat && (
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                fontFamily={"cursive"}
                color="#4caf50"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                marginBottom={"20px"}
              >
                {selectedchat.chatName}
              </Typography>
            </>
          )}
          {selectedchat.groupAdmin._id === user._id ? (
            <>
              {selectedchat?.users?.map((user, index) => (
                <Box
                  key={`${user._id}-${index}`} // Ensuring uniqueness
                  display="flex"
                  alignItems="center"
                  gap={1}
                  p={1}
                  borderRadius={2}
                  bgcolor="#e0f7fa"
                  width={"50%"}
                >
                  <Typography>{user.name}</Typography>
                </Box>
              ))}

              <input
                type="text"
                placeholder="Rename The Group"
                value={groupName}
                onChange={(e) => {
                  setgroupName(e.target.value);
                }}
                style={{
                  width: "70%",
                  height: "30px",
                  border: "2px solid black",
                  borderRadius: "5px",
                }}
              />
              <Button
                variant="contained"
                color="success"
                style={{
                  width: "30%",
                  height: "30px",
                  border: "2px solid black",
                  borderRadius: "5px",
                  marginLeft: "300px",
                  marginTop: "-65px",
                }}
                onClick={handleRename}
              >
                Update
              </Button>

              <input
                type="text"
                placeholder="Add Users"
                value={search}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                style={{
                  width: "70%",
                  height: "30px",
                  border: "2px solid black",
                  borderRadius: "5px",
                }}
              />
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

              <Button
                variant="contained"
                color="success"
                style={{
                  width: "30%",
                  height: "30px",
                  border: "2px solid black",
                  borderRadius: "5px",
                  marginLeft: "300px",
                  marginTop: "-65px",
                }}
                onClick={handleAdd}
              >
                Add
              </Button>
            </>
          ) : (
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              fontFamily={"cursive"}
              color="#4caf50"
            >
              {selectedchat?.users?.map((user, index) => (
                <Box
                  key={`${user._id}-${index}`} // Ensuring uniqueness
                  display="flex"
                  alignItems="center"
                  gap={1}
                  p={1}
                  borderRadius={2}
                  bgcolor="#e0f7fa"
                  width={"50%"}
                  marginLeft={"85px"}
                >
                  <Typography
                    display={"flex"}
                    alignItems={"center"}
                    marginLeft={"10px"}
                  >
                    {user.name}
                  </Typography>
                </Box>
              ))}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default GroupChatModal;
