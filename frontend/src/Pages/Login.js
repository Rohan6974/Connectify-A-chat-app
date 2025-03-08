import React, { use, useEffect, useState } from "react";
import { Link, replace, unstable_HistoryRouter } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/auth");
    }else{
      navigate("/login")
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!email || !password) {
      return setOpenAlert(true);
    }

    try {
      const response = await axios.post("http://localhost:9438/user/login", {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      console.log(response.data);
      setAlertMessage(true)
      setOpenAlert(false);}
    catch (err) {
      console.log(err);
    }
    
  };
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.switchText}>
          Don't have an account?
          <Link to="/" style={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
      <Snackbar open={openAlert} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Kindly enter all the details
        </Alert>
      </Snackbar>

      <Snackbar
        open={alertMessage}
        autoHideDuration={6000}
        onClose={() => setAlertMessage()}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Login successful
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
    border: "1px solid #4caf50",
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
    border: "1px solid #4caf50",
    borderRadius: "4px",
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
  },
  switchText: {
    color: "#4caf50",
    textAlign: "center",
    marginTop: "20px",
  },
  link: {
    color: "#4caf50",
    textDecoration: "underline",
    marginLeft: "5px",
  },
};

export default Login;
