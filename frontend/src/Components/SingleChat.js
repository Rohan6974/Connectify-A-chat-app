import React from "react";
import { ChatState } from "../context/context";
import { Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GroupChatModal from "../Miscellaneous/GroupChatModal";
const SingleChat = ({ fetchAgain, setfetchAgain }) => {
  const { user, selectedchat, chats, setselectedchat } = ChatState();
  console.log(selectedchat);
  return (
    <>
      {selectedchat ? (
        <>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            bgcolor={"#282C34"}
            width={"100%"}
            height={"100%"}
          >
            <CloseIcon
              sx={{ color: "#4caf50", cursor: "pointer" }}
              onClick={() => setselectedchat("")}
            />
          </Box>

          {
            selectedchat.isGroupChat ? (
                <Box
            sx={{
              display: "grid",
              placeItems: "center",
              height: "100%",
              left: "100%",
              marginLeft: "150%",
              marginTop: "10px",
            }}
          >
            <GroupChatModal />
          </Box>
                
            ):(
                <></>
            )
          }

        
        </>
      ) : (
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            height: "100%",
            top: "50%",
            left: "50%",
            marginLeft: "70%",
            marginTop: "50%",
          }}
        >
          <Typography fontFamily={"cursive"} top={"50%"} left={"50%"}>
            no chat selected
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
