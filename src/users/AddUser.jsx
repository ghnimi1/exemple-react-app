import React, { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AddUser() {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [role, setRole] = useState("");

  const AddUser = async (e) => {
    e.preventDefault();
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      telephone: phone,
      grade: grade,
      role: role,
    };

    await axios
      .post("http://localhost:3001/register", data)
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          toast.error(response.data.error, {
            theme: "colored",
          });
        } else if (response.data.notmatch) {
          toast.error(data.notmatch, {
            theme: "colored",
          });
        } else {
          toast.success(response.data.message, {
            theme: "colored",
          });
          navigate("/user");
        }
      })
      .catch((err) => console.log(err));
  };

  // const phoneRegExp = /^[2-9]{2}[0-9]{8}/;
  // const passwordRegExp =
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  // const initialValues = {
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   password: "",
  //   phone: "",
  //   grade: "",
  //   role: "",
  // };
  // const validationSchema = Yup.object().shape({
  //   firstname: Yup.string().min(4).required("Required"),
  //   lastname: Yup.string().min(4).required("Required"),
  //   email: Yup.string().email("Enter valid email").required("Required"),
  //   password: Yup.string()
  //     .min(8, "Minimum characters should be 8")
  //     .matches(
  //       passwordRegExp,
  //       "Password must have one upper, lower case, number, special symbol"
  //     )
  //     .required("Required"),
  //   phone: Yup.string()
  //     .matches(phoneRegExp, "Enter valid Phone number")
  //     .required("Required"),
  //   grade: Yup.string().min(5).required("Required"),
  // });
  // const onSubmit = (values, props) => {
  //   console.log(values);
  // };

  return (
    <Card
      style={{
        width: "80%",
        marginTop: "3%",
        marginLeft: "10%",
        boxShadow: "  0px 10px 20px rgb(200 208 216 / 30%);",
        borderRadius: "10px",
      }}
    >
      <CardHeader
        title="Add new user"
        titleTypographyProps={{ variant: "h6" }}
      />
      <Divider sx={{ margin: 0 }} />
      <Formik
      // initialValues={initialValues}
      // onSubmit={onSubmit}
      // validationSchema={validationSchema}
      >
        {(props) => (
          <form>
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    1. Account Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Firstname"
                    placeholder="carter"
                    name="firstname"
                    error={props.errors.firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Lastname"
                    name="lastname"
                    placeholder="Leonard"
                    error={props.errors.lastname}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <ErrorMessage name="lastname">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    type="email"
                    label="Email"
                    placeholder="carterleonard@gmail.com"
                    name="email"
                    error={props.errors.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <ErrorMessage name="email">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    type="password"
                    label="Password"
                    placeholder="password"
                    name="password"
                    error={props.errors.password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <ErrorMessage name="password">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    type="password"
                    label="Confirm password"
                    placeholder="Confirm password"
                    name="confirm"
                    error={props.errors.password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <ErrorMessage name="password">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ marginBottom: 0 }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    2. Personal Info
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Phone"
                    placeholder="+216 3423424"
                    name="phone"
                    error={props.errors.phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <ErrorMessage name="phone">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Grade"
                    placeholder="Stagiaire..."
                    name="grade"
                    error={props.errors.grade}
                    onChange={(e) => setGrade(e.target.value)}
                  />
                  <ErrorMessage name="grade">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ marginBottom: 0 }} />
                </Grid>
                <Grid item xs={12} mb={3}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    3. Role
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="form-layouts-separator-select-label">
                    rôle
                  </InputLabel>
                  <Select
                    onChange={(e) => setRole(e.target.value)}
                    label="Role"
                    defaultValue=""
                    id="form-layouts-separator-select"
                    labelId="form-layouts-separator-select-label"
                    name="role"
                  >
                    <MenuItem value="Administrateur">Administrateur</MenuItem>
                    <MenuItem value="Collaborateur">Collaborateur</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
            <CardActions>
              <Button
                style={{ width: "25%", height: "50px" }}
                type="submit"
                sx={{ mr: 2 }}
                variant="contained"
                onClick={AddUser}
              >
                Add User
              </Button>
              <Button
                type="reset"
                style={{ width: "25%", height: "50px" }}
                color="secondary"
                variant="outlined"
              >
                Cancel
              </Button>
            </CardActions>
          </form>
        )}
      </Formik>
    </Card>
  );
}

export default AddUser;
