// ** React Imports
import React, { useState } from "react";
import axios from "axios";
// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
// ** Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
const TabSecurity = () => {
  // ** States

  const user = JSON.parse(localStorage.getItem("user"));
  const { email } = user;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [values, setValues] = useState({
    showNewPassword: false,
    showCurrentPassword: false,
    showConfirmNewPassword: false,
  });

  const changePassword = () => {
    axios
      .put("http://localhost:3001/changepassword", {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        email: email,
      })
      .then((response) => {
        console.log(response.data.fild);
        if (response.data.fild) {
          toast.error(response.data.fild, {
            theme: "colored",
          });
        } else if (response.data.error) {
          toast.error(response.data.error, {
            theme: "colored",
          });
        } else if (response.data.notmatch) {
          toast.error(response.data.notmatch, {
            theme: "colored",
          });
        } else {
          toast.success(response.data.message, {
            theme: "colored",
          });
        }
      });
  };

  // Handle Current Password

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };

  const handleMouseDownCurrentPassword = (event) => {
    event.preventDefault();
  };

  // Handle New Password

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  // Handle Confirm New Password

  const handleClickShowConfirmNewPassword = () => {
    setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword,
    });
  };

  const handleMouseDownConfirmNewPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} ml={35}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-current-password">
                    Current Password
                  </InputLabel>
                  <OutlinedInput
                    label="Current Password"
                    value={values.currentPassword}
                    id="account-settings-current-password"
                    type={values.showCurrentPassword ? "text" : "password"}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? (
                            <EyeOutline />
                          ) : (
                            <EyeOffOutline />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 1 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-new-password">
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    label="New Password"
                    value={values.newPassword}
                    id="account-settings-new-password"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    type={values.showNewPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowNewPassword}
                          aria-label="toggle password visibility"
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? (
                            <EyeOutline />
                          ) : (
                            <EyeOffOutline />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} mb={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-settings-confirm-new-password">
                    Confirm New Password
                  </InputLabel>
                  <OutlinedInput
                    label="Confirm New Password"
                    value={values.confirmNewPassword}
                    id="account-settings-confirm-new-password"
                    type={values.showConfirmNewPassword ? "text" : "password"}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? (
                            <EyeOutline />
                          ) : (
                            <EyeOffOutline />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              marginTop: [7.5, 2.5],
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />

      <CardContent>
        <Box sx={{ mt: 1.75, display: "flex", alignItems: "center" }}></Box>

        <Box sx={{ mt: 0, display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              maxWidth: 368,
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          ></Box>
        </Box>

        <Box sx={{ mt: 8 }}>
          <Button
            style={{ width: "25%", height: "50px" }}
            onClick={changePassword}
            variant="contained"
            sx={{ marginRight: 3.5 }}
          >
            Update password
          </Button>
          <Button
            style={{ width: "25%", height: "50px" }}
            type="reset"
            variant="outlined"
            color="secondary"
            onClick={() =>
              setValues({
                ...values,
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
              })
            }
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  );
};

export default TabSecurity;
