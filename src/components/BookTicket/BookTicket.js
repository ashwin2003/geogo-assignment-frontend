import React, { useEffect, useState } from "react";
import "./BookTicket.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import axios from "axios";
import SelectSeacts from "../Modals/SelectSeats";

const BookTicket = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const eventId = state.eventId;
  const token = localStorage.getItem("ticket-token");

  const [tickets, setTickets] = useState([]);
  const [event, setEvent] = useState([]);
  const [selectSeats, setSelectSeats] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState();

  useEffect(() => {
    getTicket();
    getEventDetails();
    // eslint-disable-next-line
  }, []);

  const getTicket = async () => {
    try {
      const { data } = await axios.get(`/ticket/${eventId}`);
      console.log(data);
      setTickets(data);
    } catch (error) {}
  };

  const getEventDetails = async () => {
    try {
      const { data } = await axios.get(`/event/${eventId}`);
      setEvent(data);
    } catch (error) {}
  };

  const onSelectSeats = (props) => {
    if (!token) {
      navigate("/login");
      return;
    }

    setSelectSeats(true);
    setSelectedTicket(props.ticket);
  };

  return (
    <>
      <SelectSeacts
        open={selectSeats}
        setSelectSeats={setSelectSeats}
        ticket={selectedTicket}
      />
      <div className="ticket-container">
        <h1>Tickets available</h1>

        <div className="cards-container">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <Card
                sx={{
                  width: 300,
                  minHeight: 120,
                  backgroundColor: "var(--color5)",
                }}
                key={ticket._id}
              >
                {/* <CardMedia
                  component="img"
                  alt="poster"
                  height="120"
                  image={ticket?.poster}
                /> */}
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    textTransform="capitalize"
                  >
                    {event?.slug}
                  </Typography>
                  <Typography gutterBottom component="div" fontSize="1rem">
                    {event?.description?.substring(0, 50)}...
                  </Typography>
                  <Typography gutterBottom component="div" fontSize="1rem">
                    Date :- {ticket?.date?.substring(0, 10)}
                  </Typography>
                  <Typography gutterBottom component="div" fontSize="1rem">
                    Time :- {ticket?.description}
                  </Typography>
                  <Typography gutterBottom component="div" fontSize="1rem">
                    Price :- ₹{ticket?.price} / ticket
                  </Typography>
                  <Typography gutterBottom component="div" fontSize="1rem">
                    Available Seats :- {ticket?.available_quantity}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "flex-start",
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => onSelectSeats({ ticket })}
                    sx={{ backgroundColor: "brown" }}
                    variant="contained"
                    // ticketid={ticket._id}
                  >
                    Select seats
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography gutterBottom variant="h6" component="div">
              No data available
            </Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default BookTicket;
