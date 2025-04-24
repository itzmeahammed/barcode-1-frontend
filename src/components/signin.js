import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "../styles/signin.css";
import SignInImage from "../assets/images/signin.avif";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [errorIndication, seterrorIndication] = useState("");

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signIn();
    }
  };

  const signIn = async () => {
    try {
      const res = await fetch("http://localhost:6778/api/user/signIn", {
        method: "PUT",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data?.token) {
        Cookies.set("token", data?.token);
        Cookies.set("role", data?.role);
        navigate("/dashboard");
      } else {
        seterrorIndication(data?.error);
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      navigate("/signin");
    }
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) navigate("/dashboard");
  }, []);
  return (
    <div className='sign-in-container'>
      <div className='sign-in-left-container'>
        <form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: "center" }}>Sign In</h1>

          <TextField
            required
            id='outlined-email'
            label='Email'
            value={email}
            onChange={handleEmailChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors.email ? "red" : "#ccc",
                },
              },
            }}
          />

          <TextField
            required
            id='outlined-password'
            label='Password'
            type='password'
            value={password}
            onChange={handlePasswordChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors.password ? "red" : "#ccc",
                },
              },
            }}
          />
          <button
            type='submit'
            disabled={
              !email || !password || !!errors.email || !!errors.password
            }
            style={{
              backgroundColor: "#00a575",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              width: "100%",
              cursor: "pointer",
              fontSize: "16px",
              opacity:
                !email || !password || !!errors.email || !!errors.password
                  ? 0.5
                  : 1,
            }}
          >
            Sign In
          </button>
          {errorIndication?.length > 0 && (
            <span className=''>{errorIndication}</span>
          )}
          <span>
            Don't have an account{" "}
            <Link to='/signup' className='sign-up-text'>
              Sign In
            </Link>
          </span>
        </form>
      </div>
      <div className='sign-in-right-container'>
        <img src={SignInImage} alt='Sign In' />
      </div>
    </div>
  );
};

export default Signin;
