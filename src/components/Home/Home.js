import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Event from "../Event/Event";
import axios from "axios";
import { Button } from "@mui/material";
import EventDetails from "../Modals/EventDetails";

const Home = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEventId, setModalEventId] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getEvents();
  }, [refresh]);

  const getEvents = async () => {
    try {
      const { data } = await axios.get(
        "https://fair-houndstooth-bear.cyclic.app/event/all"
      );

      setEvents(data?.slice(0, 4));
      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onViewAllclick = () => {
    navigate("/events");
  };

  return (
    <>
      {modalEventId && (
        <EventDetails open={modal} eventId={modalEventId} setModal={setModal} />
      )}
      <div className="home-container">
        <div className="left">
          <h1>The cheapest tickets on the internet, period.</h1>
          <p>
            This is a assignment project for GeoGo made by Ashwin Jagarwal
            (ashwinjagarwal123@gmail.com) .
          </p>
          <div className="button-container"></div>
        </div>
        <div className="right">
          <h2>Events in your area.</h2>
          <div className="events-container">
            {events.length > 0 ? (
              events.map((item) => (
                <Event
                  details={item}
                  key={item._id}
                  setModal={setModal}
                  setModalEventId={setModalEventId}
                />
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
          <Button
            variant="text"
            className="view-all-button"
            onClick={onViewAllclick}
            sx={{ color: "var(--color4)" }}
            size="large"
          >
            View All
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
