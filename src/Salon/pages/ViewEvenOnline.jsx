import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function ViewEvenOnline() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");

  const getSingleOnlineEvent = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/getEventOnline/${id}`
    );
    setTitle(data.title);
    setStart(data.start);
    setEnd(data.end);
    setDescription(data.description);
  };

  useEffect(() => {
    getSingleOnlineEvent();
  }, []);

  return (
    <div
      className="user"
      style={{
        width: "100%",
        marginLeft: "5%",
        height: "90%",
        marginRight: "5%",
        position: "relative",
        paddingBottom: 40,
        paddingInline: 20,
        border: "1px solid #E6552D",
      }}
    >
      <div
        style={{
          background: "#6495ED",
          width: "150px",
          color: "white",
          padding: "10px",
          borderRadius: 7,
          textAlign: "center",
          position: "absolute",
          top: -23,
          background: "#E6552D",
        }}
      >
        Online event
      </div>

      <h3>Name of event : {title} </h3>
      <h3>Start in: {start} </h3>
      <h3>End in : {end} </h3>
      <h3>Description : {description} </h3>
    </div>
  );
}

export default ViewEvenOnline;
