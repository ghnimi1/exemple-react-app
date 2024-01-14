// ** React Imports
import React, { useState, useEffect } from "react";
// ** MUI Imports
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
// ** Styled Components
const TabInfo = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [adresse, setAdresse] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const { id } = user;
  const getSingleUser = async () => {
    const { data } = await axios.get(`http://localhost:3001/user/${id}`);
    setFirstName(data.firstname);
    setLastName(data.lastname);
    setEmail(data.email);
    setPhone(data.telephone);
    setGrade(data.grade);
    setAdresse(data.adresse);
  };
  useEffect(() => {
    getSingleUser();
  }, [id]);
  return (
    <CardContent>
      <Grid container spacing={9}>
        <Grid item xs={12} sm={6}>
          FirstName
        </Grid>
        <Grid item xs={12} sm={6}>
          {firstname}
        </Grid>
        <Grid item xs={12} sm={6}>
          Lastname
        </Grid>
        <Grid item xs={12} sm={6}>
          {lastname}
        </Grid>
        <Grid item xs={12} sm={6}>
          Email
        </Grid>
        <Grid item xs={12} sm={6}>
          {email}
        </Grid>
        <Grid item xs={12} sm={6}>
          Grade
        </Grid>
        <Grid item xs={12} sm={6}>
          {grade}
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default TabInfo;
