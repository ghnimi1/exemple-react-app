import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import moment from "moment";
import { Row, Col, Modal, Card, Tag } from "antd";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast, Zoom } from "react-toastify";
// function
import {
  createEvents,
  listEvent,
  handleCurrentMonth,
  updateEvent,
  removeEvent,
} from "../functions/createEvent";

import "./event.css";
function Event() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = user;
  //  const [radio, setRadio] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [values, setValues] = useState({
    title: "",
    start: "",
    end: "",
    lieu: "",
    UserId: id,
    color: "",
    email: "",
    description: "",
    typeEvent: "",
    langueEvent: "",
  });

  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState([]);

  const [idEvent, setIdEvent] = useState("");

  const department = [
    { id: "1", name: "event important", color: "#FAAA8D" },
    { id: "2", name: "event soir ", color: "#8ca6fa" },
    { id: "3", name: "event  matin ", color: "#169505" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listEvent()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCLick = (info) => {
    showModal1();
    console.log(info.event.id);
    setIdEvent(info.event.id);
  };

  const handleRemove = () => {
    // alert(idEvent)
    removeEvent(idEvent)
      .then((res) => {
        toast.success(res.data.message, {
          theme: "colored",
        });
        loadData();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalVisible1(false);
  };

  const currentMonth = (info) => {
    const m = info.view.calendar.currentDataManager.data.currentDate;
    const mm = moment(m).format("M");
    handleCurrentMonth({ mm })
      .then((res) => {
        setCurrentEvent(res.data);
        // console.log(currentEvent);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelect = (info) => {
    showModal();
    console.log(info);
    setValues({
      title: values.title,
      lieu: values.lieu,
      color: values.color,
      UserId: values.UserId,
      start: info.startStr,
      end: info.endStr,
      email: values.email,
      description: values.description,
      typeEvent: values.typeEvent,
      langueEvent: values.langueEvent,
    });
  };

  const handleChange = (info) => {
    // console.log((info.event.id))
    // console.log(info.event.startStr,info.event.endStr)
    const values = {
      id: info.event.id,
      start: info.event.startStr,
      end: info.event.endStr,
    };
    updateEvent(values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeTitle = (e) => {
    console.log(e.target.value);
    setValues({ ...values, title: e.target.value });
  };

  const onChangeColor = (e) => {
    console.log(e.target.value);
    setValues({ ...values, color: e.target.value });
  };
  const onChangeLieu = (e) => {
    console.log(e.target.value);
    setValues({ ...values, lieu: e.target.value });
  };
  const onChangeEmail = (e) => {
    console.log(e.target.value);
    setValues({ ...values, email: e.target.value });
  };
  const onChangeDescription = (e) => {
    console.log(e.target.value);
    setValues({ ...values, description: e.target.value });
  };
  const onChangeType = (e) => {
    console.log(e.target.value);
    setValues({ ...values, typeEvent: e.target.value });
  };
  const onChangeLangue = (e) => {
    console.log(e.target.value);
    setValues({ ...values, langueEvent: e.target.value });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    console.log(values);
    setIsModalVisible(false);
    const res = await createEvents(values);
    setValues({ ...values, title: "" });
    loadData();
    console.log(res);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setValues({ ...values, title: "" });
  };

  const showModal1 = () => {
    setIsModalVisible1(true);
  };

  const handleOk1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };

  console.log(events);

  const d = moment(new Date()).format("DD/MM/YYYY");
  const r = moment(new Date());

  const filterDate = currentEvent.filter((item) => {
    return d == moment(item.start).format("DD/MM/YYYY");
  });
  console.log(filterDate);

  const betweenDate = currentEvent.filter((item) => {
    return r >= moment(item.start) && r <= moment(item.end);
  });

  console.log("between", betweenDate);

  return (
    <div className="card" style={{ marginTop: "5%" }}>
      <div className="col-md-18">
        <Row>
          <Col span={5}>
            <Card>
              <ul>
                {department.map((item, index) => (
                  <li
                    className="fc-event"
                    key={index}
                    style={{ backgroundColor: item.color }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </Card>
            <Card style={{ backgroundColor: "#e5eaf5" }}>
              <ol>
                {currentEvent.map((item, index) => (
                  <li key={index} style={{ fontSize: "15px" }}>
                    {d == moment(item.start).format("DD/MM/YYYY") ? (
                      <>
                        {moment(item.start).format("DD/MM/YYYY") +
                          "-" +
                          item.title}
                        <Tag color="green">today event</Tag>
                      </>
                    ) : r >= moment(item.start) && r < moment(item.end) ? (
                      <>
                        {moment(item.start).format("DD/MM/YYYY") +
                          "-" +
                          item.title}
                        <Tag color="red">event passé</Tag>
                      </>
                    ) : (
                      <>
                        {" "}
                        {moment(item.start).format("DD/MM/YYYY") +
                          "-" +
                          item.title}
                      </>
                    )}
                  </li>
                ))}
              </ol>
            </Card>
          </Col>
          <Col span={16}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={events}
              selectable={true}
              select={handleSelect}
              datesSet={currentMonth}
              eventClick={handleCLick}
              editable={true}
              eventChange={handleChange}
            />
            <Modal
              title="Add New Event"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Grid item xs={12} mb={2}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {/* <p>Please select the Event Place:</p>
                    <input type="radio" id="age1" name="event" value="online" onChange={(e) => setRadio(e.target.value)} />
                    <label for="age1">Online</label><br />
                    <input type="radio" id="age2" name="event" value="pres" onChange={(e) => setRadio(e.target.value)} />
                    <label for="age2">Prsentiel</label><br /> */}
                  1. Profil d'évenement
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} mb={4}>
                <TextField
                  fullWidth
                  label="Ajouter un titre"
                  value={values.title}
                  onChange={onChangeTitle}
                  placeholder="Event of project name"
                />
              </Grid>
              <Grid item xs={12} sm={6} mb={4}>
                <TextField
                  fullWidth
                  label="Liste des paricitpants"
                  value={values.email}
                  onChange={onChangeEmail}
                  placeholder="email."
                />
              </Grid>
              <Grid item xs={12} sm={6} mb={4}>
                <FormControl fullWidth>
                  <InputLabel id="form-layouts-separator-select-label">
                    type event
                  </InputLabel>
                  <Select
                    onChange={onChangeType}
                    label="Country"
                    defaultValue=""
                  >
                    <MenuItem value="Public">Public</MenuItem>
                    <MenuItem value="Privé">Privé</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} mb={4}>
                <FormControl fullWidth>
                  <InputLabel id="form-layouts-separator-select-label">
                    Langue
                  </InputLabel>
                  <Select
                    onChange={onChangeLangue}
                    label="Country"
                    defaultValue=""
                  >
                    <MenuItem value="Francais">Francais</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} mb={2}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  2. Planning de l'événement
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} mb={4}>
                <TextField
                  fullWidth
                  label="Start of event"
                  value={values.start}
                  placeholder="Start of event"
                />
              </Grid>
              <Grid item xs={12} sm={6} mb={4}>
                <TextField
                  fullWidth
                  label="End of event"
                  value={values.end}
                  placeholder="End of event"
                />
              </Grid>

              <Grid item xs={12} mb={2}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  3. Informations supplémentaires
                </Typography>
              </Grid>
              {/* {
                        radio==="online" ? null
                         
                        : 
                        } */}
              <Grid item xs={12} sm={6} mb={4}>
                <TextField
                  fullWidth
                  label="lieu de event"
                  value={values.lieu}
                  onChange={onChangeLieu}
                  placeholder="tunis,...."
                />
              </Grid>
              <Grid item sm={6} mb={2}>
                <TextField
                  value={values.description}
                  onChange={onChangeDescription}
                  fullWidth
                  multiline
                  label="Description de l'événement"
                  rows={3}
                />
              </Grid>
              {/* <label> titre </label><input name="title" value={values.title}  onChange={onChangeTitle} /><br/>
                    <label> lieu </label> <input name="lieu" value={values.lieu}  onChange={onChangeLieu} /> */}
              <select
                name="color"
                onChange={onChangeColor}
                style={{
                  width: "100%",
                  height: "80%",
                  border: "1px solid ",
                  borderRadius: "5px",
                  textAlign: "3px",
                  padding: "10px",
                }}
              >
                {department.map((item, index) => (
                  <option key={index} value={item.color}>
                    {item.name}
                  </option>
                ))}
              </select>
              {/* <Grid item sm={6} mb={2}>
                <Select
                  style={{ width: "70%" }}
                  name="color"
                  defaultValue=" color"
                  id="form-layouts-separator-select"
                  labelId="form-layouts-separator-select-label"
                >
                  {department.map((item, index) => (
                    <MenuItem key={index} value={item.color}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid> */}
            </Modal>
            <Modal
              title="Delete an event"
              visible={isModalVisible1}
              onOk={handleOk1}
              onCancel={handleCancel1}
              footer={[
                <button
                  className="del"
                  style={{
                    width: "150px",
                    height: "50px",
                    marginRight: "2%",
                    borderRadius: "2px",
                  }}
                  onClick={handleRemove}
                >
                  Delete
                </button>,
                <button
                  className="cancel"
                  style={{
                    width: "150px",
                    height: "50px",
                    marginRight: "90px",
                    borderRadius: "2px",
                  }}
                  onClick={handleCancel1}
                >
                  Cancel
                </button>,
              ]}
            >
              <h1 style={{ textAlign: "center" }}>
                Are you sure you want to delete this event
              </h1>
            </Modal>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Event;
