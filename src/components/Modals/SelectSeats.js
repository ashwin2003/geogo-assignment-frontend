import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SelectSeats = (props) => {
  const navigate = useNavigate();

  const [numSeats, setNumSeats] = useState(0);
  const [error, setError] = useState(false);

  const token = localStorage.getItem("ticket-token");

  useEffect(() => {
    onBookClick();
    return;
    // eslint-disable-next-line
  }, []);

  const onBackdropClick = () => {
    props.setSelectSeats(false);
  };

  const onNumSeatsChange = (e) => {
    setNumSeats(e.target.value);
  };

  const onBookClick = async () => {
    setError(false);
    if (numSeats <= 0 || numSeats > props.ticket?.available_quantity) {
      setError(true);
      return;
    }

    try {
      const orderData = { ticketId: props.ticket?._id, numSeats };
      const config = {
        headers: { authorization: `Bearer ${token}` },
      };
      // eslint-disable-next-line
      const { data } = await axios.post("/order/add", orderData, config);

      setError(false);
      props.setSelectSeats(false);
      setNumSeats(0);
      navigate("/orders");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={onBackdropClick}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      <Card
        sx={{ width: 400, borderRadius: 4, backgroundColor: "var(--color5)" }}
      >
        <CardContent
          sx={{
            //   backgroundColor: "red",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography gutterBottom component="div" fontSize="1.5rem">
            Available Seats :- {props.ticket?.available_quantity}
          </Typography>
          <TextField
            id="standard-basic"
            label="Enter number of seats"
            variant="standard"
            type="number"
            //   fullWidth
            value={numSeats}
            onChange={onNumSeatsChange}
            autoComplete="off"
          />
          {error && <p>Enter valid seats.</p>}
          <Button
            variant="contained"
            // fullWidth={false}
            onClick={onBookClick}
            sx={{ backgroundColor: "brown" }}
          >
            Book
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default SelectSeats;
