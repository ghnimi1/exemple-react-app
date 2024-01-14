import React, { useState, useEffect, useMemo } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import axios from "axios";
import Linechart from "./Linechart";
import Lineechart from "./Lineechart";
function Dashboard() {
  const [countusers, setCountUsers] = useState("");
  const [countpresevents, setPreEvents] = useState("");
  const [countonlineevents, setOnlineEvents] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/countusers").then((result) => {
      setCountUsers(result.data.users);
      // console.log(result.data.users);
    });
  });
  useEffect(() => {
    axios.get("http://localhost:3001/countPevents").then((resultat) => {
      setPreEvents(resultat.data.events);
      // console.log(result.data.users);
    });
  });
  useEffect(() => {
    axios.get("http://localhost:3001/countOEvents").then((online) => {
      setOnlineEvents(online.data.eventsonline);
      // console.log(result.data.users);
    });
  });

  const widgets = useMemo(() => {
    return [
      {
        label: "Number of users",
        value: countusers,
        icon: "fa fa-users",
      },
      {
        label: "Event online",
        value: countpresevents,
        icon: "fa fa-calendar",
      },
      {
        label: "Event presentiel",
        value: countonlineevents,
        icon: "fa fa-calendar",
      },
    ];
  }, [countusers, countpresevents, countonlineevents]);
  return (
    <Container>
      <Row>
        <Row className="mt-12 ml-md-5  d-flex justify-content-center mb-5 ">
          {widgets.map((i, index) => {
            return (
              <Col md={4}>
                <Card
                  style={{
                    width: "270px",
                    height: "130px",
                    border: "1px solid #E6552D",
                  }}
                  className=" shadow mt-md-2  rounded"
                >
                  <Card.Body>
                    <Row>
                      <Col>
                        <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                          Nouveaux
                        </span>
                        <span className="h3 font-bold mb-0">{i.value}</span>{" "}
                      </Col>
                      <div className="">
                        <div
                          className="icon icon-shape  text-white text-lg rounded-circle"
                          style={{
                            width: "38px",
                            height: "30px",
                            paddingLeft: "10px",
                            background: "#E6552D",
                          }}
                        >
                          {" "}
                          <i className={i.icon} />{" "}
                        </div>
                      </div>
                    </Row>
                    <div className="mt-2 mb-0 text-sm">
                      <span className="badge badge-pill bg-soft-success text-success me-2">
                        <i className="bi bi-arrow-up me-1" />
                      </span>
                      <span className="text-nowrap text-xs text-muted">
                        {i.label}{" "}
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Col md={6}>
          <div style={{ width: 500, height: 300 }}>
            <Linechart />
          </div>
        </Col>
        <Col md={6}>
          <div style={{ width: 500, height: 300 }}>
            {/* <Bar data={userDATA} />
        <Pie data={userDATA} />{" "} */}
            <Lineechart />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
