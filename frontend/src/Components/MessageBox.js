import SingleChat from "./SingleChat";
import { ChatState } from "../context/context";
import { Box } from "@mui/material";

const MessageBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedchat } = ChatState();

  return (
    <Box
      display={selectedchat ? "flex" : "none"}
      flexDirection="column"
      justifyContent="flex-end"
      p={3}
      width={{ xs: "100%", md: "68%" }}
      borderRadius="10px"
      height="calc(100vh - 120px)"
      position="fixed"
      bottom={10} 
      right={-10}
    >
      {selectedchat && (
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      )}
    </Box>
  );
};

export default MessageBox;
