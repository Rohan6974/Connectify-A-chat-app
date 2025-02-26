import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Drawer,
  Divider,
  Avatar,
  Modal,
  Snackbar,
  Alert,
  ListItemText,
  
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/context";
import axios, { Axios } from "axios";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);


  const [auth, setAuth] = React.useState(true);

  const [logout, setlogout] = React.useState();
  
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [SidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchresult, setSearchresult] = React.useState([]);
  const [loadingchat, setloadingchat] = React.useState(false);


   const { user,setselectedchat,setchats,chats,selectedchat } = ChatState();

  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const toggleDrawer = (isOpen) => () => {
    setOpenDrawer(isOpen);
  };

  const handleProfile = () => {
    setOpenProfileModal(true);
  };

  const handlesubmit = async () => {
    if (!search) {
      return setOpenAlert(true);
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:9438/user?search=${search}`,
        config
      );

      setSearchresult(response.data);
      setSidebarOpen(true);
     
     
    } catch (error) {
      console.log(error);
    }
  };

  const accesschat = async (userId) => {
    try {
      const config = {
        headers:{
          "Content-type":"application/json",
          Authorization: `Bearer ${user.token}`,
          
        }
      }
      const {data} =await axios.post("http://localhost:9438/chats",{userId},config)  

      setselectedchat(data);
      setchats([...chats,data]);
      setOpenDrawer(false);
 
    } catch (error) {
      <Snackbar open={openAlert} autoHideDuration={2}>
        <Alert onClose={() => setOpenAlert(false)} severity="warning">
          User Not Found
        </Alert>
      </Snackbar> 
    }
  }
  const DrawerList = (
    <Box sx={{ width: 250, p: 2 }}>
      <input
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          height: "30px",
          borderRadius: "5px",
          border: "1px solid #4caf50",
          padding: "5px",
        }}
      />
      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 1 }}
        onClick={handlesubmit}
      >
        Search
      </Button>
      <Divider sx={{ mt: 2 }} />

      {searchresult.map((item) => (
        <Button onClick={() => {accesschat(item._id)}} style={{ display: "flex", justifyContent: "start", alignItems: "start" , width: "100%", }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            alt={item.name}
            src={item.pic}
            style={{
              width: "40px",
              height: "40px",
              border: "2px solid #000",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          />

            <ListItemText primary={item.name} style={{ display: "table-column", justifyContent: "normal" , alignItems: "start", width: "40px"}}/>
            
        </div>
      </Button>
      ))}
    </Box>
  );

  return (
    <Box bgcolor={"#282C34"} width="100%" height="70px" position={"absolute"}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            display: { xs: "flex", sm: "block" },
            ml: 2,
            color: "#4caf50",
            fontFamily: "cursive",
          }}
        >
          Connectify
        </Typography>

        <Button variant="contained" color="success" onClick={toggleDrawer(true)}  >
          Search User
        </Button>

        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>

        <IconButton size="large" onClick={handleMenu} color="inherit">
          <AccountCircle style={{ color: "#4caf50" }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleProfile}>
            <Avatar alt="user" src={user.pic} sx={{ mr: 1 }} />
            Profile
          </MenuItem>

          <MenuItem onClick={handleLogout} sx={{ color: "#4caf50" }}>
            <LogoutIcon sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>

        <Modal open={openProfileModal} onClose={() => setOpenProfileModal(false)}>
          <Box sx={style}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                alt="user"
                src={user.pic}
                sx={{
                  width: 100,
                  height: 100,
                  border: "2px solid #4caf50",
                  mx: "auto",
                }}
              />
              <Typography sx={{ mt: 2 }}>Name: {user.name}</Typography>
              <Typography>Email: {user.email}</Typography>
            </Box>
          </Box>
        </Modal>

        <Snackbar open={openAlert} autoHideDuration={2000} onClose={() => setOpenAlert(false)}>
          <Alert severity="error" sx={{ width: "100%" }}>
            Please Enter User Name
          </Alert>
        </Snackbar>
      </Toolbar>
    </Box>
  );
}