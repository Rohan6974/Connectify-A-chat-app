import { createContext, use, useContext, useEffect, useState } from "react";
import  {useNavigate}  from "react-router-dom";

const chatcontext = createContext();
const ContextProvider = ({ children }) => {
  const [user, setuser] = useState([]);
  const [chats, setchats] = useState([[]]);
  const [selectedchat, setselectedchat] = useState();


  const navigate = useNavigate();

    useEffect(() => {
      
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setuser(userInfo);  
      if(!userInfo) navigate("/login")
    }, []);

  return (
    <chatcontext.Provider value={{ user, setuser, chats, setchats, selectedchat, setselectedchat  }}>
      {children}
    </chatcontext.Provider>
  );
};

export const ChatState = () => {
  return useContext(chatcontext);
};

export default ContextProvider;
