import React, { useState, useEffect } from "react";
import "./AllEvents.css";
import axios from "axios";
import Event from "../Event/Event";
import EventDetails from "../Modals/EventDetails";
import Nodatafound from "../NoData/Nodatafound";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEventId, setModalEventId] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const { data } = await axios.get(
        "https://fair-houndstooth-bear.cyclic.app/event/all"
      );
      setError(false);
      setEvents(data);
    } catch (error) {
      setEvents([]);
      setError(true);
    }
  };
  return (
    <div className="all-events-container">
      {modalEventId && (
        <EventDetails open={modal} eventId={modalEventId} setModal={setModal} />
      )}
      <h1>All Events</h1>
      <div className="all-events">
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
          <Nodatafound />
        )}
      </div>
    </div>
  );
};

export default AllEvents;
