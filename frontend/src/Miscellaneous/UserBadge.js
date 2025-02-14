import { Box } from "@mui/material";
import React from "react";

const UserBadge = (user, handleFunction) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
      color={"black"}
    >
      {user.name}
    </Box>
  );
};

export default UserBadge;
