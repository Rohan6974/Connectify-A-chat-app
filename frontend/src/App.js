import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import ChatPage from "./Pages/ChatPage";
import Auth from "./Pages/Auth";


function App() {
  
  return (
    <div className="App">
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<ChatPage />}/>
            <Route path="/auth" element={<Auth />} />
          </Routes>
    </div>
  );
}

export default App;