import React, { useState } from 'react'
import {Alert, Snackbar} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Auth = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [receivedOtp, setReceivedOtp] = useState("");
  const [step, setStep] = useState("send");
  const [successmessage, setsuccessmessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const [invaildmessage, setinvaildmessage] = useState(false);
  const  navigate = useNavigate()
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://connectify-a-chat-app.onrender.com/auth", { email,otp, Headers: { "Content-Type": "application/json" } });
      const data = await res.data;
      setReceivedOtp(data.otp);

      if (res.data.otp) {
        setMessage(true);
      } else {
        setAlertMessage(true);
      }
    } catch (error) {
      console.log(error);
      
    }
  };
  const handleVerifyOtp = (e) => {
  e.preventDefault();
    if (parseInt(otp) === receivedOtp) {
      setsuccessmessage(true);
      navigate("/chat")

    } else {
      setinvaildmessage(true);
    }
  };
  return (
    <div>
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>Enter OTP</h1>
          <form style={styles.form}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label style={styles.label}>OTP</label>
            <input
              style={styles.input}
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button style={styles.button} type="submit" onClick={handleSendOtp}>send OTP</button>
            <button style={styles.button} type="submit" onClick={handleVerifyOtp}>Verify OTP</button>
          </form>
        </div>
      </div>
      <div>
        <Snackbar
          open={alertMessage}
          autoHideDuration={60}
        >
          <Alert severity="error">OTP does not send</Alert>
        </Snackbar>

        <Snackbar
          open={message}
          autoHideDuration={60}
          security='success'
        >
          <Alert severity="success">OTP sent successfully</Alert>
        </Snackbar>

        <Snackbar
          open={successmessage}

          autoHideDuration={60}
        >
          <Alert severity="success">OTP verified successfully</Alert>
        </Snackbar>

        <Snackbar
          open={invaildmessage}
          autoHideDuration={60}
        >
          <Alert severity="error">Invalid OTP. Please try again.</Alert>
        </Snackbar>

      </div>
     

      
    </div>
  )
}


const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282C34',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#282C34',
    border: '1px solid #4caf50',
    borderRadius: '4px',
  },
  title: {
    color: '#4caf50',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#4caf50',
  },
  input: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#282C34',
    color: '#4caf50',
    border: '1px solid #4caf50',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4caf50',
    color: '#282C34',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
  switchText: {
    color: '#4caf50',
    textAlign: 'center',
    marginTop: '20px',
  },
  link: {
    color: '#4caf50',
    textDecoration: 'underline',
    marginLeft: '5px',
  },
}

export default Auth