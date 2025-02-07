import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Alert, Button, ListItemText, Snackbar } from "@mui/material";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import { ChatState } from "../context/context";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import axios from "axios";
import { set } from "mongoose";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logout, setlogout] = React.useState();
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [SidebarOpen, setSidebarOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [searchresult, setSearchresult] = React.useState([]);
  const [loadingchat, setloadingchat] = React.useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user,setselectedchat,setchats,chats,selectedchat } = ChatState();

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userInfo");
    navigate("/login");
    setlogout(true);
  };
  const handleclose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {};
  const handleclick = async () => {
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const toggleDrawer = (Open) => () => {
    setSidebarOpen(Open);
  };

  const accesschat=async(userId) =>{
    try {
      const config = {
        headers:{
          "Content-type":"application/json",
          Authorization: `Bearer ${user.token}`,
          
        }
      }
      const response =await axios.post("http://localhost:9438/chats",{userId},config)
     
      setchats(response.data)
      setselectedchat(response.data[0])
      
     
 
    } catch (error) {
      <Snackbar open={openAlert} autoHideDuration={2}>
        <Alert onClose={() => setOpenAlert(false)} severity="warning">
          User Not Found
        </Alert>
      </Snackbar> 
    }
  }
  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation">
      <h3 style={{ textAlign: "center" }}>Search User</h3>
      <Divider style={{ marginBottom: "10px" }} />
      <input
        value={search}
        type="text"
        placeholder="Search User"
        style={{
          width: "60%",
          marginLeft: "10px",
          height: "30px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        style={{
          backgroundColor: "#4caf50",
          color: "#fff",
          marginLeft: "4px",
          marginTop: "10px",
        }}
        onClick={handleclick}
      >
        Search
      </Button>
      {openAlert && (
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={() => setOpenAlert(false)}
        >
          <Alert
            onClose={() => setOpenAlert(false)}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Please Enter Some Text
          </Alert>
        </Snackbar>
      )}
      <List >
        {searchresult.map((item) => (
          <Button onClick={()=>{accesschat(item._id)}} style={{ display: "flex", justifyContent: "start", alignItems: "start" , width: "100%", }}>
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
    
                <ListItemText primary={item.name} secondary={item.email}  style={{ display: "table-column", justifyContent: "normal" , alignItems: "start"}}/>
                
            </div>
          </Button>
        ))}
        </List>
    </Box>
  );


  return (
    <div style={{ backgroundColor: "#282C34", color: "#fff" }}>
      <Box>
        <AppBar position="static" color="#282C34">
          <Toolbar>
            <Button
              onClick={toggleDrawer(true)}
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
                marginLeft: "4px",
                marginTop: "10px",
              }}
            >
              Search User
            </Button>
            <Drawer open={SidebarOpen} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ fontFamily: "cursive", marginRight: "90px" }}
            >
              Connectify
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle  style={{color:"#4caf50"}}/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorE1={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleclose}
                  style={{
                    color: "#fff",
                    fontSize: "15px",
                    fontFamily: "cursive",
                    paddingLeft: "7000px",
                  }}
                >
                  <MenuItem onClick={handleProfile}>
                    <Button
                      onClick={handleOpen}
                      style={{
                        marginLeft: "18px",
                        fontFamily: "cursive",
                        fontSize: "15px",
                      }}
                    >
                      {" "}
                      <Avatar alt="user" src={user.pic} />
                      Profile
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        ></Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <Box
                            sx={{ display: "flex" }}
                            style={{
                              alignItems: "center",
                              height: "300px",
                              widhth: "300px",
                              justifyContent: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Avatar
                              alt="user"
                              src={user.pic}
                              style={{
                                width: "100px",
                                height: "100px",
                                border: "2px solid #4caf50",
                              }}
                            />
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                          </Box>
                        </Typography>
                      </Box>
                    </Modal>
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogout}
                    style={{
                      fontFamily: "cursive",
                      fontSize: "15px",
                      color: "#4caf50",
                      marginLeft: "35px",
                      width: "100%",
                    }}
                  >
                    <LogoutIcon />
                    Logout
                  </MenuItem>
                </Menu>
                <Snackbar open={openAlert} autoHideDuration={2}>
                  <Alert severity="error" sx={{ width: "100%" }}>
                    Please Enter User Name
                  </Alert>
                </Snackbar>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
