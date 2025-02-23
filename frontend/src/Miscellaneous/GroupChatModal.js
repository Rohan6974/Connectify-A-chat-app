import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Modal, Typography } from '@mui/material';

const GroupChatModal = () => {
    
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-40%, -40%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
         <Button onClick={handleOpen}><VisibilityIcon sx={{color:"#4caf50", cursor:"pointer"}}/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
        </Box>
      </Modal>
    </div>
  )
}

export default GroupChatModal