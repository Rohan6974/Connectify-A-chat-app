import React from 'react'
import { Box, Button } from '@mui/material'
import { ChatState } from '../context/context'
import SingleChat from './SingleChat'

const MessageBox = ({fetchAgain, setfetchAgain}) => {
  const { selectedchat } = ChatState()
  return (
    <Box style={{color:"white", fontFamily:"cursive", }} width={"60%"} display={{base:selectedchat?"none":"flex", md:"flex"}} bgcolor={"#282C34"}>

      <SingleChat fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
    
    </Box>
  )
}

export default MessageBox