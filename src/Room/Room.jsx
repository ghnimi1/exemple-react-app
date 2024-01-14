import React, { useState, useEffect } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Room() {
  const [rooms, setRooms] = useState([]);

  const getRooms = async () => {
    const { data } = await axios.get("http://localhost:3001/allRoom");
    setRooms(data.result);
  };
  useEffect(() => {
    getRooms();
  }, []);
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="mt-5 mb-5 ">
        {rooms.map((item, key) => (
          <Col md={4}>
            <Card
              onClick={() => {
                navigate(`/viewroom/${item.id}`);
              }}
              style={{ width: "280px", height: "150px" }}
              className=" shadow mt-md-2 rounded"
            >
              <Card.Body>
                <Row>
                  <Col>
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                      Salon
                    </span>
                    <span className="h3 font-bold mb-0">{item.url}</span>
                  </Col>
                  <div className="">
                    <div
                      className="icon icon-shape bg-primary text-white text-lg rounded-circle"
                      style={{ width: "40px", paddingLeft: "10px" }}
                    >
                      <i
                        className="fa fa-video-camera"
                        style={{ height: "25px" }}
                      ></i>
                    </div>
                  </div>
                </Row>

                <div className="mt-2 mb-0 text-sm">
                  <span className="text-nowrap text-xs text-muted"></span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Room;
