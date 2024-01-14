import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const getSingleUser = async () => {
      const { data } = await axios.get(`http://localhost:3001/user/${id}`);
      setFirstName(data.firstname);
      setLastName(data.lastname);
      setEmail(data.email);
      setPhone(data.telephone);
      setGrade(data.grade);
      setRole(data.role);
    };

    getSingleUser();
  }, [id]);

  const updateUser = (e) => {
    e.preventDefault();
    // update by put request
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      telephone: phone,
      grade: grade,
      role: role,
    };
    axios.put(`http://localhost:3001/user/${id}`, data).then((response) => {
      if (response.status === 200) {
        console.log(response);
        toast.success(response.data.message);
      }
    });

    navigate("/user");
  };
  return (
    <Card style={{ width: "80%", marginTop: "3%", marginLeft: "10%" }}>
      {/* <CreditScoreIcon /> */}
      <CardHeader
        title="Edit User"
        titleTypographyProps={{ variant: "h6" }}
        style={{ marginLeft: "5%", marginTop: "0%" }}
      />

      <Divider sx={{ margin: 0 }} />
      <form onSubmit={(e) => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                1. Account Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Firstname"
                placeholder="Alberto"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="email"
                label="Lastname"
                placeholder="Jhon"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                placeholder="carterleonard@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                label="Phone"
                placeholder="+216232332"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                label="Grade"
                placeholder="Stagiaire,inge..."
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="form-layouts-separator-select-label">
                  rôle
                </InputLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  label="Role"
                  defaultValue=""
                  id="form-layouts-separator-select"
                  labelId="form-layouts-separator-select-label"
                >
                  <MenuItem value="Administrateur">Administrateur</MenuItem>
                  <MenuItem value="Collaborateur">Collaborateur</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>

        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button
            style={{ width: "25%", height: "50px" }}
            type="submit"
            sx={{ mr: 2 }}
            variant="contained"
            onClick={updateUser}
          >
            Save change
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

export default EditUser;
