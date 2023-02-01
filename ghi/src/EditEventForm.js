import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./EditEventForm.css";
import { useToken } from "./Accounts/Authentication.js";

function BootstrapInput(props) {
  const { id, labelText, value, onChange, type } = props;
  return (
    <div className="form-floating mb-3">
      <input
        value={value}
        onChange={onChange}
        placeholder={id}
        required
        type={type}
        name={id}
        id={id}
        className="form-control"
      />
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
    </div>
  );
}

function EditEventForm() {
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [attendeeCapacity, setAttendeeCapacity] = useState("");
  const { id } = useParams();
  const [submitted, setSubmitted] = useState("d-none");
  const [successClasses, setSuccessClasses] = useState("d-none");
  const [accountId, setAccountId] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const [token] = useToken();

  useEffect(() => {
    async function fetchToken() {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
      const fetchConfig = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setAccountId(data.account.id);
      }
    }

    async function fetchEvent() {
      const response = await fetch(
        `${process.env.REACT_APP_EVENTS_HOST}/api/events/${id}`
      );
      const data = await response.json();
      setVenue(data.venue);
      setDescription(data.description);
      setDate(data.date);
      setTime(data.time);
      setAddress(data.address);
      setPictureUrl(data.picture_url);
      setAttendeeCapacity(data.attendee_capacity);
    }
    fetchToken();
    fetchEvent();
  }, [token, id]);

  useEffect(() => {
    setTimeout(() => {
      if (deleted) {
        navigate(`/chef/${accountId}`);
      }
    }, 3000);
  }, [deleted, accountId, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      venue: venue,
      description: description,
      date: date,
      time: time,
      address: address,
      picture_url: pictureUrl,
      attendee_capacity: attendeeCapacity,
      chef_id: event.chef_id,
    };
    const serviceUrl = `${process.env.REACT_APP_EVENTS_HOST}/api/events/${id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetch(serviceUrl, fetchConfig);
    setSuccessClasses("alert alert-success my-2");
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const serviceUrl = `${process.env.REACT_APP_EVENTS_HOST}/api/events/${id}`;
    const fetchConfig = {
      method: "delete",
      credentials: "include",
      header: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(serviceUrl, fetchConfig).then((response) => {
      if (response.ok) {
        setVenue("");
        setDescription("");
        setDate("");
        setTime("");
        setAddress("");
        setPictureUrl("");
        setAttendeeCapacity("");
        setSubmitted("alert alert-danger my-5");
        setDeleted(true);
      }
    });
  };

  let formClasses = "shadow p-4 mt-4";
  if (deleted) {
    formClasses = "d-none";
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className={formClasses}>
          <h1>Edit Event</h1>
          <form onSubmit={handleSubmit} id="edit-event-form">
            <BootstrapInput
              id="venue"
              type="text"
              labelText="Venue"
              onChange={(e) => setVenue(e.target.value)}
              value={venue}
            />
            <div className="form-floating mb-3">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                placeholder="description"
                name="description"
                id="description"
                className="form-control"
              />
              <label htmlFor="description" className="form-label">
                Description
              </label>
            </div>
            <BootstrapInput
              id="date"
              type="date"
              labelText="Date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
            <BootstrapInput
              id="time"
              type="time"
              labelText="Time"
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
            <BootstrapInput
              id="address"
              type="address"
              labelText="Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <BootstrapInput
              id="pictureUrl"
              type="pictureUrl"
              labelText="Picture Url"
              onChange={(e) => setPictureUrl(e.target.value)}
              value={pictureUrl}
            />
            <BootstrapInput
              id="attendeeCapacity"
              type="number"
              labelText="Attendee Capacity"
              onChange={(e) => setAttendeeCapacity(e.target.value)}
              value={attendeeCapacity}
            />
            <button className="btn btn-primary me-2">Update</button>
            <button
              className="Delete btn btn-danger float-right me-2"
              type="submit"
              onClick={handleDelete}
            >
              Delete
            </button>
          </form>
        </div>
        <div className={submitted} role="alert">
          This event has been deleted.
        </div>
        <div className={successClasses} role="alert">
          Event successfully edited! Click{" "}
          <Link to={`/chef/${accountId}`}>here</Link> to go back.
        </div>
      </div>
    </div>
  );
}
export default EditEventForm;
