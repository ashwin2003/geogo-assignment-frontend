import axios from "axios";
import "./YourOrders.css";
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Nodatafound from "../NoData/Nodatafound";

const YourOrders = () => {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem("ticket-token");

  useEffect(() => {
    // eslint-disable-next-line
    getOrders();
    return; // eslint-disable-next-line
  }, [refresh]);

  const getOrders = async () => {
    try {
      const config = {
        headers: { authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(
        "https://fair-houndstooth-bear.cyclic.app/order/",
        config
      );
      setOrders(data);
    } catch (error) {}
  };

  const onCancelClick = async (props) => {
    try {
      const config = {
        headers: { authorization: `Bearer ${token}` },
      }; // eslint-disable-next-line
      const { data } = await axios.put(
        `https://fair-houndstooth-bear.cyclic.app/order/cancel/${props.orderId}`,
        {
          status: "Cancelled",
        },
        config
      );
    } catch (error) {}
    setRefresh(!refresh);
  };

  return (
    <div className="orders-container">
      <h1>Your orders</h1>

      <div className="cards-container">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card
              sx={{
                width: 400,
                borderRadius: 4,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "var(--color5)",
              }}
              key={order._id}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  // color: "brown",
                }}
              >
                <Typography gutterBottom component="div" fontSize="1rem">
                  Event Name :- {order?.eventName}
                </Typography>
                <Typography gutterBottom component="div" fontSize="1rem">
                  Total price :- {order?.total_price}
                </Typography>
                <Typography gutterBottom component="div" fontSize="1rem">
                  Seats :- {order?.numSeats}
                </Typography>
                <Typography gutterBottom component="div" fontSize="1rem">
                  Status :- {order?.status}
                </Typography>
              </CardContent>
              {order?.status === "Confirmed" && (
                <Button
                  variant="contained"
                  onClick={() => onCancelClick({ orderId: order._id })}
                  className="cancel-button"
                >
                  Cancel
                </Button>
              )}
            </Card>
          ))
        ) : (
          <Nodatafound />
        )}
      </div>
    </div>
  );
};

export default YourOrders;
