import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import "./Event.css";
import { useNavigate } from "react-router-dom";

const Event = (props) => {
  const navigate = useNavigate();

  const { slug, poster } = props.details;

  const onViewClick = () => {
    props.setModalEventId(props.details._id);
    props.setModal(true);
  };

  const onBookClick = () => {
    navigate("/book", { state: { eventId: props.details._id } });
  };

  return (
    <Card
      sx={{
        width: 300,
        minHeight: 150,
        backgroundColor: "var(--color5)",
      }}
      className="event-container"
    >
      <CardMedia component="img" alt="poster" height="120" image={poster} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textTransform="capitalize"
          color={"var(--color4)"}
        >
          {slug}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={onViewClick}
          sx={{ backgroundColor: "brown" }}
        >
          View
        </Button>
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
  );
};

export default Event;
