import React, { useEffect, useState } from "react";
import "./Login.css";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    if (!email || !password) setError(true);

    try {
      const { data } = await axios.post(
        "https://fair-houndstooth-bear.cyclic.app/user/login",
        loginData
      );
      setError(false);
      localStorage.setItem("ticket-token", data?.token);
      navigate("/");
    } catch (error) {
      setError(true);
    }

    // navigate("/");
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmitHandler} className="form-container">
        <h1>Login</h1>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          type="email"
          className="text-field"
          // fullWidth
          value={email}
          onChange={onEmailChange}
          autoComplete="off"
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          className="text-field"
          // fullWidth
          value={password}
          onChange={onPasswordChange}
          autoComplete="off"
        />
        {error && <p>Please enter valid email and password.</p>}
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "var(--color4)" }}
        >
          Login
        </Button>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="link-label">
            Create one now.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
