import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { AddBoxSharp } from "@mui/icons-material";
import axios from "axios";

const DashBoardTicket = () => {
  const token = localStorage.getItem("ticket-token");

  const [ticketModal, setTicketModal] = useState(false);
  const [eventId, setEventId] = useState("");
  const [validEventId, setvalidEventId] = useState(false);
  // const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState(0);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [error, setError] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const openTicketModal = () => {
    setTicketModal(true);
  };

  const onBackdropClick = () => {
    setTicketModal(false);
    setError(false);
    setStartTime("");
    setEndTime("");
    setStartDate("");
    setEndDate("");
    setPrice(0);
    setAvailableQuantity(0);
    setTotalQuantity(0);
    setEventId("");
    setvalidEventId(false);
    setDate("");
  };

  const onCreateClick = async (e) => {
    e.preventDefault();
    setError(false);

    if (
      !price ||
      price <= 0 ||
      !date ||
      !availableQuantity ||
      !totalQuantity ||
      date > endDate ||
      date < startDate ||
      !startTime ||
      !endTime ||
      startTime > endTime
    ) {
      setError(true);
      return;
    }

    try {
      const ticketData = {
        eventId,
        description: startTime + "-" + endTime,
        price,
        date,
        available_quantity: availableQuantity,
        total_quantity: totalQuantity,
      };
      const config = {
        headers: { authorization: `Bearer ${token}` },
      };
      // eslint-disable-next-line
      const { data } = await axios.post(
        "https://fair-houndstooth-bear.cyclic.app/ticket/add",
        ticketData,
        config
      );

      setTicketModal(false);
      setError(false);
      setStartTime("");
      setEndTime("");
      setStartDate("");
      setEndDate("");
      setPrice(0);
      setAvailableQuantity(0);
      setTotalQuantity(0);
      setEventId("");
      setvalidEventId(false);
      setDate("");
    } catch (error) {
      //   setError(true);
    }
  };

  const onCheckEventId = async () => {
    try {
      const { data } = await axios.get(
        `https://fair-houndstooth-bear.cyclic.app/event/${eventId}`
      );

      const sd =
        data?.start_date?.substring(0, 4) +
        "-" +
        data?.start_date?.substring(5, 7) +
        "-" +
        data?.start_date?.substring(8, 10);

      const ed =
        data?.end_date?.substring(0, 4) +
        "-" +
        data?.end_date?.substring(5, 7) +
        "-" +
        data?.end_date?.substring(8, 10);

      setvalidEventId(true);
      setStartDate(sd);
      setEndDate(ed);
    } catch (error) {
      setvalidEventId(false);
    }
  };

  const onchangeEventId = (e) => {
    setEventId(e.target.value);
  };

  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const onDateChange = (e) => {
    setDate(e.target.value);
  };

  const onAvailableQuantityChange = (e) => {
    setAvailableQuantity(e.target.value);
  };

  const onTotalQuantityChange = (e) => {
    setTotalQuantity(e.target.value);
  };

  const onStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };
  const onEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  return (
    <>
      <Modal
        open={ticketModal}
        onClose={onBackdropClick}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <Card sx={{ width: 500, borderRadius: 4 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--color1)",
            }}
          >
            <Typography gutterBottom component="div" fontSize="2rem">
              Create a Ticket
            </Typography>
            {
              <>
                <TextField
                  id="standard-basic"
                  label="Enter event Id"
                  variant="standard"
                  type="text"
                  autoComplete="off"
                  fullWidth
                  value={eventId}
                  onChange={onchangeEventId}
                />

                {!validEventId && (
                  <>
                    <p>Enter valid Event Id</p>
                    <Button
                      variant="contained"
                      onClick={onCheckEventId}
                      sx={{ backgroundColor: "brown" }}
                    >
                      Check
                    </Button>
                  </>
                )}
              </>
            }
            {validEventId && (
              <>
                <div className="date-conatiner">
                  <p>
                    Enter date between {startDate} and {endDate}
                  </p>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="date"
                    autoComplete="off"
                    // fullWidth
                    value={date}
                    onChange={onDateChange}
                  />
                </div>
                <div className="date-conatiner">
                  <Typography
                    component="div"
                    fontSize="1rem"
                    style={{ display: "inline" }}
                  >
                    Enter Start time {"  "}
                  </Typography>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="time"
                    autoComplete="off"
                    fullWidth
                    value={startTime}
                    onChange={onStartTimeChange}
                  />
                </div>
                <div className="date-conatiner">
                  <Typography
                    component="div"
                    fontSize="1rem"
                    style={{ display: "inline" }}
                  >
                    Enter End time {"  "}
                  </Typography>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="time"
                    autoComplete="off"
                    fullWidth
                    value={endTime}
                    onChange={onEndTimeChange}
                  />
                </div>

                <TextField
                  id="standard-basic"
                  label="Enter price"
                  variant="standard"
                  type="number"
                  autoComplete="off"
                  fullWidth
                  value={price}
                  onChange={onPriceChange}
                />
                <TextField
                  id="standard-basic"
                  label="Enter total quantity"
                  variant="standard"
                  type="number"
                  autoComplete="off"
                  fullWidth
                  value={totalQuantity}
                  onChange={onTotalQuantityChange}
                />
                <TextField
                  id="standard-basic"
                  label="Enter available quantity"
                  variant="standard"
                  type="number"
                  autoComplete="off"
                  fullWidth
                  value={availableQuantity}
                  onChange={onAvailableQuantityChange}
                />
                {error && <p>Enter valid data.</p>}

                <Button
                  variant="contained"
                  onClick={onCreateClick}
                  sx={{ backgroundColor: "brown" }}
                >
                  Create
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Modal>
      <div className="dash-ticket-container">
        <h2>Tickets</h2>
        <Card
          sx={{
            width: 250,
            minHeight: 170,
            backgroundColor: "var(--color5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            cursor: "pointer",
          }}
          className="action-container"
          onClick={openTicketModal}
        >
          <AddBoxSharp
            fontSize="large"
            sx={{
              color: "yellow",
            }}
          />
          <CardActions>
            <Typography gutterBottom variant="h5" color="var(--color4)">
              Create a Ticket
            </Typography>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default DashBoardTicket;
