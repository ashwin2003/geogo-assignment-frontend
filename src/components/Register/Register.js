import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const onPhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const registerData = {
      full_name: fullName,
      phone_number: phoneNumber,
      email,
      password,
    };

    if (!email || !password || phoneNumber.length !== 10) setError(true);

    try {
      // eslint-disable-next-line
      const { data } = await axios.post(
        "https://fair-houndstooth-bear.cyclic.app/user/register",
        registerData
      );
      setError(false);
      navigate("/login");
    } catch (error) {
      setError(true);
    }

    // navigate("/");
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={onSubmitHandler} className="form-container">
        <TextField
          id="standard-basic"
          label="Full Name"
          variant="standard"
          type="text"
          // fullWidth
          value={fullName}
          onChange={onFullNameChange}
          autoComplete="off"
          className="text-field"
        />
        <TextField
          id="standard-basic"
          label="Phone Number"
          variant="standard"
          type="number"
          // fullWidth
          value={phoneNumber}
          onChange={onPhoneNumberChange}
          autoComplete="off"
          className="text-field"
        />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          type="email"
          // fullWidth

          value={email}
          onChange={onEmailChange}
          autoComplete="off"
          className="text-field"
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          // fullWidth
          value={password}
          onChange={onPasswordChange}
          autoComplete="off"
          className="text-field"
        />

        {error && <p>Enter valid data.</p>}
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "var(--color4)" }}
        >
          Register
        </Button>
        <p>
          Aready have an account?{" "}
          <Link to="/login" className="link-label">
            Login.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
