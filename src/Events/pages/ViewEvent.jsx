import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";

function ViewEvent() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [eventLanguage, seteventLanguage] = useState("");
  const [location, setlocation] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    getSingleUser();
    getParticipantsByEvent();
  }, []);

  const getParticipantsByEvent = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/participants/${id}`
    );

    console.log(data, "daaas");
    setParticipants(data?.result);
  };

  const getSingleUser = async () => {
    const { data } = await axios.get(`http://localhost:3001/api/event/${id}`);

    setTitle(data.title);
    setStart(data.start);
    setEnd(data.end);
    setTypeEvent(data.typeEvent);
    seteventLanguage(data.langueEvent);
    setlocation(data.lieu);
    setDescription(data.description);
  };

  const keys = useMemo(
    () => [
      {
        key: "Name of event",
        value: title,
      },
      {
        key: "Start in ",
        value: start,
      },
      {
        key: "End in",
        value: end,
      },
      {
        key: "Type of event",
        value: typeEvent,
      },
      {
        key: "Event language",
        value: eventLanguage,
      },
      {
        key: "Location",
        value: location,
      },
      {
        key: "Description",
        value: description,
      },
    ],
    [end, description, location, start, eventLanguage, title, typeEvent]
  );

  console.log({ id, participants });
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        width: "100%",
        paddingInline: 55,
        paddingBlock: 20,
        background: "white",
        borderRadius: 15,
        marginTop: 50,
        border: "1px solid #e6552d ",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
          background: "#e6552d",
          padding: 7,
          color: "white",
          fontWeight: "bold",
          borderRadius: 15,
          width: "40%",
          alignSelf: "center",
        }}
      >
        Present Event
      </div>
      {keys.map((i, index) => (
        <div className="d-flex justify-content-start align-items-center">
          <h3 key={index} style={{ marginBottom: 20 }}>
            {i.key}:
          </h3>
          <p className="ml-20" style={{ marginLeft: "30%" }}>
            {" "}
            {i.value}
          </p>
        </div>
      ))}

      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
          background: "#e6552d",
          padding: 7,
          color: "white",
          fontWeight: "bold",
          borderRadius: 15,
          width: "40%",
          alignSelf: "center",
        }}
      >
        Event Participants
      </div>
      {participants.length > 0 ? (
        <Table striped>
          <thead>
            <tr>
              <th>id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((el, idx) => {
              return (
                <tr key={idx}>
                  <td>{el.id}</td>
                  <td>{el.firstname}</td>
                  <td>{el.lastname}</td>
                  <td>{el.email}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div
          style={{
            background: "#f6f0ea",
            padding: 15,
            borderRadius: 5,
            fontFamily: "Rubik, sans-serif",
          }}
          className="d-flex align-items-center justify-content-center align-self-center"
        >
          There is no participants for this event
        </div>
      )}
    </div>
  );
}

export default ViewEvent;
