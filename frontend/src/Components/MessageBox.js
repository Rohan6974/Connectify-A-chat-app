import SingleChat from "./SingleChat";
import { ChatState } from "../context/context";
import { Box, Typography } from "@mui/material";

const MessageBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedchat } = ChatState();

  return (
    <Box
      display={selectedchat ? "flex" : "none"}
      alignItems="start"
      flexDirection="column"
      p={3}
      bgcolor="#282C34"
      width={{ xs: "100%", md: "68%" }}
      borderRadius="10px"
      border="1px solid #4caf50"
      height="calc(100vh - 100px)" // Adjust height to fit properly
      position="relative" // Helps with layout correction
      overflowY="auto"
      marginTop={"2000px"}
      sx={{
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#282C34",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#4caf50",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#4caf50",
        },  
        "&::-webkit-scrollbar-thumb:active": {
          backgroundColor: "#4caf50",
        },
        "&::-webkit-scrollbar-corner": {
          backgroundColor: "#282C34",
        
      }}
    }
    >{
     selectedchat && (
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)
    }
      
    </Box>
  );
};

export default MessageBox;