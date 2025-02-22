import React from 'react'
import { Box, Button } from '@mui/material'
import { ChatState } from '../context/context'

const MessageBox = () => {
  const { selectedchat } = ChatState()
  return (
    <Box style={{color:"white", fontFamily:"cursive", padding:"20px", }}  display={{base:selectedchat?"none":"flex", md:"flex"}}>
    
    </Box>
  )
}

export default MessageBox