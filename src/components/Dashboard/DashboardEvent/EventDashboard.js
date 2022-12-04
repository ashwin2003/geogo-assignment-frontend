import React, { useState } from "react";

import {
  Card,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { AddBoxSharp, Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const EventDashboard = () => {
  const token = localStorage.getItem("ticket-token");

  // Create Event States
  const [createModal, setCreateModal] = useState(false);
  const [slug, setslug] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [createEventError, setCreateEventError] = useState(false);

  // Update Event
  const [updateModal, setUpdateModal] = useState(false);
  const [eventId, setEventId] = useState("");
  const [validEventId, setValidEventId] = useState("");
  const [uSlug, setUSlug] = useState("");
  const [uname, setUName] = useState("");
  const [uDescription, setUDescription] = useState("");
  const [uStartDate, setUStartDate] = useState("");
  const [uEndDate, setUEndDate] = useState("");
  const [updateEventError, setUpdateEventtError] = useState(false);

  // Delete Event
  const [deleteEventId, setDeleteEventId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteEventError, setDeleteEventError] = useState(false);

  // Upload Poster
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "geogoAssignment");
    data.append("cloud_name", "dgsjlfsoi");
    fetch("https://api.cloudinary.com/v1_1/dgsjlfsoi/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };
  const onSlugChange = (e) => {
    setslug(e.target.value);
  };

  const onNamechange = (e) => {
    setName(e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const onStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const onEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const openCreateModal = async () => {
    setCreateModal(true);
  };

  const onBackdropClick = () => {
    setCreateModal(false);
    setUpdateModal(false);
    setDeleteModal(false);

    setUSlug("");
    setUDescription("");
    setUName("");
    setUStartDate("");
    setUEndDate("");
    setValidEventId(false);
    setEventId("");
    setUrl("");
  };

  const onCreateClick = async () => {
    setCreateEventError(false);

    if (
      !slug ||
      !name ||
      !description ||
      !startDate ||
      !endDate ||
      endDate < startDate
    ) {
      setCreateEventError(true);
      return;
    }

    try {
      const eventData = {
        slug,
        name,
        description,
        start_date: startDate,
        end_date: endDate,
      };

      if (url) eventData["poster"] = url;

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      const { data } = await axios.post(
        "https://fair-houndstooth-bear.cyclic.app/event/add",
        eventData,
        config
      );

      setCreateModal(false);
      setUrl("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Update Event
  const openUpdateModal = () => {
    setUpdateModal(true);
  };

  const onChangeEventId = (e) => {
    setEventId(e.target.value);
  };

  const checkEventId = async () => {
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

      setValidEventId(true);
      setUSlug(data?.slug);
      setUDescription(data?.description);
      setUName(data?.name);
      setUStartDate(sd);
      setUEndDate(ed);
    } catch (error) {}
  };

  const onUSlugChange = (e) => {
    setUSlug(e.target.value);
  };

  const onUNamechange = (e) => {
    setUName(e.target.value);
  };
  const onUDescriptionChange = (e) => {
    setUDescription(e.target.value);
  };
  const onUStartDateChange = (e) => {
    setUStartDate(e.target.value);
  };
  const onUEndDateChange = (e) => {
    setUEndDate(e.target.value);
  };

  const onUpdateClick = async () => {
    setUpdateEventtError(false);

    if (
      !uSlug ||
      !uname ||
      !uDescription ||
      !uStartDate ||
      !uEndDate ||
      uEndDate < uStartDate
    ) {
      setUpdateEventtError(true);
      return;
    }

    try {
      const updateEventData = {
        slug: uSlug,
        name: uname,
        description: uDescription,
        start_date: uStartDate,
        end_date: uEndDate,
      };

      if (url) updateEventData["poster"] = url;

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };
      // eslint-disable-next-line
      const { data } = await axios.put(
        `https://fair-houndstooth-bear.cyclic.app/event/${eventId}`,
        updateEventData,
        config
      );

      setUpdateModal(false);
      setUSlug("");
      setUDescription("");
      setUName("");
      setUStartDate("");
      setUEndDate("");
      setValidEventId(false);
      setEventId("");
      setUrl("");
    } catch (error) {}
  };

  // Delete Event

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const onChangeDeleteEventId = (e) => {
    setDeleteEventId(e.target.value);
  };

  const onDeleteClick = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    try {
      // eslint-disable-next-line
      const { data } = await axios.delete(
        `https://fair-houndstooth-bear.cyclic.app/event/${deleteEventId}`,
        config
      );
      setDeleteEventError(false);
      setDeleteModal(false);
    } catch (error) {
      setDeleteEventError(true);
    }
  };

  return (
    <>
      <Modal
        open={createModal}
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
              Create a Event
            </Typography>
            <TextField
              id="standard-basic"
              label="Enter slug"
              variant="standard"
              type="text"
              autoComplete="off"
              fullWidth
              value={slug}
              onChange={onSlugChange}
            />
            <TextField
              id="standard-basic"
              label="Enter Event name"
              variant="standard"
              type="text"
              autoComplete="off"
              fullWidth
              value={name}
              onChange={onNamechange}
            />
            <TextField
              id="standard-basic"
              label="Enter description"
              variant="standard"
              type="text"
              autoComplete="off"
              fullWidth
              value={description}
              onChange={onDescriptionChange}
            />
            <div className="date-conatiner">
              <Typography
                component="div"
                fontSize="1rem"
                style={{ display: "inline" }}
              >
                Enter Start date :-
              </Typography>
              <TextField
                id="standard-basic"
                variant="standard"
                type="date"
                autoComplete="off"
                fullWidth
                value={startDate}
                onChange={onStartDateChange}
              />
            </div>

            <div className="date-conatiner">
              <Typography
                component="div"
                fontSize="1rem"
                style={{ display: "inline" }}
              >
                Enter End date :-
              </Typography>
              <TextField
                id="standard-basic"
                variant="standard"
                type="date"
                autoComplete="off"
                fullWidth
                value={endDate}
                onChange={onEndDateChange}
              />
            </div>
            <div className="upload-field">
              {/* <div> */}
              <TextField
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="text-field"
              ></TextField>
              <Button
                onClick={uploadImage}
                variant="text"
                sx={{ color: "var(--color4)" }}
              >
                Upload
              </Button>
              {/* </div> */}
              <Avatar src={url} />
            </div>
            {createEventError && <p>Enter valid data and upload poster.</p>}
            <Button
              variant="contained"
              onClick={onCreateClick}
              sx={{ backgroundColor: "brown" }}
            >
              Book
            </Button>
          </CardContent>
        </Card>
      </Modal>
      <Modal
        open={updateModal}
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
              Update a Event
            </Typography>

            <TextField
              id="standard-basic"
              label="Enter event Id"
              variant="standard"
              type="text"
              autoComplete="off"
              fullWidth
              value={eventId}
              onChange={onChangeEventId}
            />
            {!validEventId && (
              <Button
                onClick={checkEventId}
                variant="contained"
                sx={{ backgroundColor: "brown" }}
              >
                Check Event
              </Button>
            )}
            {validEventId && (
              <>
                <TextField
                  id="standard-basic"
                  label="Enter slug"
                  variant="standard"
                  type="text"
                  autoComplete="off"
                  fullWidth
                  value={uSlug}
                  onChange={onUSlugChange}
                />
                <TextField
                  id="standard-basic"
                  label="Enter Event name"
                  variant="standard"
                  type="text"
                  autoComplete="off"
                  fullWidth
                  value={uname}
                  onChange={onUNamechange}
                />
                <TextField
                  id="standard-basic"
                  label="Enter description"
                  variant="standard"
                  type="text"
                  autoComplete="off"
                  fullWidth
                  value={uDescription}
                  onChange={onUDescriptionChange}
                />
                <div className="date-conatiner">
                  <Typography
                    component="div"
                    fontSize="1rem"
                    style={{ display: "inline" }}
                  >
                    Enter Start date :-
                  </Typography>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="date"
                    autoComplete="off"
                    fullWidth
                    value={uStartDate}
                    onChange={onUStartDateChange}
                  />
                </div>

                <div className="date-conatiner">
                  <Typography
                    component="div"
                    fontSize="1rem"
                    style={{ display: "inline" }}
                  >
                    Enter End date :-
                  </Typography>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="date"
                    autoComplete="off"
                    fullWidth
                    value={uEndDate}
                    onChange={onUEndDateChange}
                  />
                </div>
                <div className="upload-field">
                  {/* <div> */}
                  <TextField
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="text-field"
                  ></TextField>
                  <Button
                    onClick={uploadImage}
                    variant="text"
                    sx={{ color: "var(--color4)" }}
                  >
                    Upload
                  </Button>
                  {/* </div> */}
                  <Avatar src={url} />
                </div>
                {updateEventError && <p>Enter valid data.</p>}
                <Button
                  variant="contained"
                  onClick={onUpdateClick}
                  sx={{ backgroundColor: "brown" }}
                >
                  Update
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Modal>
      <Modal
        open={deleteModal}
        onClose={onBackdropClick}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <Card sx={{ width: 400, borderRadius: 4 }}>
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
              Delete a Event
            </Typography>

            <TextField
              id="standard-basic"
              label="Enter event Id"
              variant="standard"
              type="text"
              autoComplete="off"
              fullWidth
              value={deleteEventId}
              onChange={onChangeDeleteEventId}
            />
            {deleteEventError && <p>Enter valid Event Id.</p>}

            <Button
              onClick={onDeleteClick}
              variant="contained"
              sx={{ backgroundColor: "brown" }}
            >
              Delete Event
            </Button>
          </CardContent>
        </Card>
      </Modal>
      <div className="event-dash-container">
        <h2>Events</h2>
        <div className="actions-container">
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
            onClick={openCreateModal}
          >
            <AddBoxSharp
              fontSize="large"
              sx={{
                color: "yellow",
              }}
            />
            <CardActions>
              <Typography gutterBottom variant="h5" color="var(--color4)">
                Create a Event
              </Typography>
            </CardActions>
          </Card>
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
            onClick={openUpdateModal}
          >
            <Edit
              fontSize="large"
              sx={{
                color: "skyblue",
              }}
            />
            <CardActions>
              <Typography gutterBottom variant="h5" color="var(--color4)">
                Update a Event
              </Typography>
            </CardActions>
          </Card>
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
            onClick={openDeleteModal}
          >
            <Delete
              fontSize="large"
              sx={{
                color: "red",
              }}
            />
            <CardActions>
              <Typography gutterBottom variant="h5" color="var(--color4)">
                Delete a Event
              </Typography>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EventDashboard;
