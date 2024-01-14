// ** React Imports
import axios from "axios";
import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

// ** Icons Imports

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const TabAccount = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { id } = user;
  const [avatar, setAvatar] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [image, setImage] = useState(null);
  const [adresse, setAdresse] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");

  const getSingleUser = async () => {
    const { data } = await axios.get(`http://localhost:3001/user/${id}`);
    setFirstName(data.firstname);
    setLastName(data.lastname);
    setEmail(data.email);
    setPhone(data.telephone === 0 ? "" : data.telephone);
    setGrade(data.grade);
    setAdresse(data.adresse === "null" ? "" : data.adresse);
    setDateNaissance(data.dateNaissance);
    setAvatar(data.picture);
  };
  useEffect(() => {
    getSingleUser();
  }, [id]);

  const updateUser = (e) => {
    e.preventDefault();

    // update by put request
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("telephone", phone);
    formData.append("grade", grade);
    formData.append("adresse", adresse);
    formData.append("dateNaissance", dateNaissance);
    formData.append("avatar", avatar);
    if (image) {
      formData.append("picture", image);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .put(`http://localhost:3001/user/${id}`, formData, config)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          toast.success(response.data.message);
          getSingleUser();
        }
      });
  };

  return (
    <CardContent>
      <form>
        <Grid container spacing={10}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {image ? (
                <ImgStyled src={URL.createObjectURL(image)} alt="Profile Pic" />
              ) : (
                <ImgStyled
                  src={`http://localhost:3001/Images/${avatar}`}
                  alt="Profile Pic"
                />
              )}

              <Box>
                <ButtonStyled
                  component="label"
                  variant="contained"
                  htmlFor="account-settings-upload-image"
                >
                  Upload New Photo
                  <input
                    hidden
                    type="file"
                    accept="image/png, image/jpeg"
                    id="account-settings-upload-image"
                    name="picture"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </ButtonStyled>

                <Typography variant="body2" sx={{ marginTop: 5 }}></Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Firstname"
              placeholder="john"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Lastname"
              placeholder="Doe"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              placeholder="johnDoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              fullWidth
              value={phone}
              placeholder="+2165656565"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Grade</InputLabel>
              <Select
                label="Grade"
                value={grade}
                onChange={(e) => {
                  setGrade(e.target.value);
                }}
              >
                <MenuItem value="stagiaire">stagiaire</MenuItem>
                <MenuItem value="Consultant">Consultant</MenuItem>
                <MenuItem value="manager">manager</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Adresse"
              placeholder="tunis,sousse"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date de naissance"
              type="date"
              placeholder="12-14-1999"
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{ width: "25%", height: "50px" }}
              variant="contained"
              onClick={updateUser}
              sx={{ marginRight: 3.5 }}
            >
              Save Changes
            </Button>
            <Button
              style={{ width: "25%", height: "50px" }}
              type="reset"
              variant="outlined"
              color="secondary"
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default TabAccount;
