import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [message, setMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://connectify-a-chat-app.onrender.com/user", {
        name,
        email,
        password,
        confirmPassword,
      }, {
        headers: {
          "Content-Type": "application/json",
        },

      });
      localStorage.setItem("userInfo", JSON.stringify(response.data));
    } catch (err) {
      console.log(err)
    }

    if (!name || !email || !password || !confirmPassword) {
      return setAlertMessage(true);
    }
    if (password === confirmPassword) {
      return navigate("/auth");
    }
    if (password !== confirmPassword) {
      return setOpenAlert(true);
    } else {
      return;
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>
          <div>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        <p style={styles.switchText}>
          Already have an account?
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
      <Snackbar open={openAlert} autoHideDuration={2}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Passwords do not match!
        </Alert>
      </Snackbar>

      <Snackbar open={alertMessage} autoHideDuration={2}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Kindly fill in all the fields
        </Alert>
      </Snackbar>

      <Snackbar open={message} autoHideDuration={2}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Successfully signed up
        </Alert>
      </Snackbar>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282C34",
  },
  formContainer: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    backgroundColor: "#282C34",
    border: "1px solid #fff",
    borderRadius: "4px",
  },
  title: {
    color: "#4caf50",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#4caf50",
  },
  input: {
    width: "100%",
    padding: "8px",
    backgroundColor: "#282C34",
    color: "#4caf50",
    border: "1px solid #fff",
    borderRadius: "4px",
    marginLeft: "-6px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "#282C34",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    marginLeft: "6px",
  },
  switchText: {
    color: "#fff",
    textAlign: "center",
    marginTop: "20px",
  },
  link: {
    color: "#4caf50",
    textDecoration: "underline",
    marginLeft: "5px",
  },
};

export default Signup;
