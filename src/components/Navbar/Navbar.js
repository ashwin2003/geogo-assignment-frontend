import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { Avatar, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("ticket-token");
  const [profile, setProfile] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getProfile(); // eslint-disable-next-line
  }, [refresh]);

  const getProfile = async () => {
    if (!token) {
      // setRefresh(!refresh);
      return;
    }

    try {
      const config = {
        headers: { authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get("/user/me", config);

      setProfile(data);
    } catch (error) {}

    // setRefresh(!refresh);
  };

  const onLogOutClick = () => {
    setRefresh(!refresh);

    localStorage.removeItem("ticket-token");
    setProfile({});
    navigate("/");
  };

  const onDashBoardClick = () => {
    navigate("/dashboard");
  };

  const onOrdersClick = () => {
    navigate("/orders");
  };

  return (
    <div className="container">
      <div className="nav-left">
        <FontAwesomeIcon icon={faGem} size="3x" color="var(--color3)" />
        <Link to="/" className="link-label">
          <h1>Tickets</h1>
        </Link>
      </div>
      <div className="nav-right">
        <Avatar sx={{ bgcolor: "var(--color3)" }}>
          {profile?.full_name?.substring(0, 1).toUpperCase()}
        </Avatar>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textTransform="capitalize"
        >
          {profile?.full_name}
        </Typography>

        {token ? (
          <>
            {profile?.role === "Admin" && (
              <Button
                variant="contained"
                fullWidth={false}
                onClick={onDashBoardClick}
                sx={{ backgroundColor: "var(--color4)" }}
              >
                DashBoard
              </Button>
            )}
            <Button
              variant="contained"
              fullWidth={false}
              onClick={onOrdersClick}
              sx={{ backgroundColor: "var(--color4)" }}
            >
              Orders
            </Button>
            <Button
              variant="contained"
              fullWidth={false}
              onClick={onLogOutClick}
              sx={{ backgroundColor: "var(--color4)" }}
            >
              LogOut
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: "var(--color4)" }}
            >
              <Link to="/login" className="link-text" params>
                Login
              </Link>
            </Button>

            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: "var(--color4)" }}
            >
              <Link to="/register" className="link-text">
                Register
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
