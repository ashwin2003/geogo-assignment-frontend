import React, { useEffect, useState } from "react";
import "./EventDetails.css";
import { Modal } from "@mui/material";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const EventDetails = (props) => {
  const navigate = useNavigate();

  const [event, setEvent] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    getEventDetails();
    // eslint-disable-next-line
  }, [props.eventId]);

  const getEventDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://fair-houndstooth-bear.cyclic.app/event/${props.eventId}`
      );

      setEvent(data);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  const onBookClick = () => {
    navigate("/book", { state: { eventId: props.eventId } });
  };

  const onBackdropClick = () => {
    props.setModal(false);
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
      {error ? (
        <p>No data available</p>
      ) : (
        <Card
          sx={{ width: 700, borderRadius: 4, backgroundColor: "var(--color1)" }}
        >
          <CardMedia
            component="img"
            alt="poster"
            height="400"
            image={event?.poster}
          />
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textTransform="capitalize"
            >
              {event?.slug}
            </Typography>
            <Typography variant="body3" color="text.secondary">
              {event?._id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event?.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              onClick={onBookClick}
              sx={{ backgroundColor: "brown" }}
            >
              Book
            </Button>
          </CardActions>
        </Card>
      )}
    </Modal>
  );
};

export default EventDetails;
