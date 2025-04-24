import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "../styles/signup.css";
import SignUpImg from "../assets/images/signup.avif";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
    role: "", // Added role
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
    role: "", // Added role error
  });

  const [error, setError] = useState(""); // General error

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const numberRegex = /^[0-9]{10}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.number) {
      newErrors.number = "Mobile number is required";
    } else if (!numberRegex.test(formData.number)) {
      newErrors.number = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.role) newErrors.role = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signUp();
    }
  };

  const signUp = async () => {
    try {
      const res = await fetch("http://localhost:6778/api/user/signUp", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        Cookies.set("token", data?.token);
        Cookies.set("role", data?.role);
        navigate("/dashboard");
      } else {
        setError("Sign Up failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) navigate("/dashboard");
  }, []);

  return (
    <div className='sign-up-container'>
      <div className='sign-up-left-container'>
        <div className='sign-up-left-container-padding d-flex-jsc'>
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <TextField
              required
              label='Username'
              name='username'
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              variant='outlined'
            />
            <TextField
              required
              label='Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              variant='outlined'
            />
            <TextField
              required
              label='Mobile'
              name='number'
              value={formData.number}
              onChange={handleChange}
              error={!!errors.number}
              helperText={errors.number}
              type='number'
              variant='outlined'
            />
            <TextField
              required
              label='Password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              variant='outlined'
            />

            {/* Role Dropdown */}
            <div className='form-field'>
              <select
                name='role'
                value={formData.role}
                onChange={handleChange}
                className={`role-dropdown ${errors.role ? "input-error" : ""}`}
              >
                <option value=''>Select Role</option>
                <option value='employee'>Staff</option>
                <option value='manager'>Manager</option>
                <option value='admin'>Admin</option>
              </select>
              {errors.role && <p className='error-message'>{errors.role}</p>}
            </div>

            <button type='submit' className='submit-btn'>
              Sign Up
            </button>
            {error && <p className='error-message'>{error}</p>}
            <span>
              Already have an account?{" "}
              <Link to='/signin' className='sign-up-text'>
                Sign In
              </Link>
            </span>
          </form>
        </div>
      </div>
      <div className='sign-up-right-container'>
        <img src={SignUpImg} alt='Sign Up' />
      </div>
    </div>
  );
};

export default Signup;
