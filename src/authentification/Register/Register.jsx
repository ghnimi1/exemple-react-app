import React, { useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
// import axios from 'axios'
import { useNavigate } from "react-router-dom";

import { toast, Zoom } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Register = (e) => {
    e.preventDefault();
    const nameRegex = /^[a-zA-Z\-]{5,20}$/;
    if (!nameRegex.test(firstname)) {
      toast.error(" Firstname  must at least 5 characters  ", {
        transition: Zoom,
        theme: "colored",
      });
      return;
    }
    if (!nameRegex.test(lastname)) {
      toast.error(" Lastname  must at least 5 characters  ", {
        transition: Zoom,
        theme: "colored",
      });
      return;
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("please enter valid email  ", {
        transition: Zoom,
        theme: "colored",
      });
      return;
    }

    if (!nameRegex.test(password)) {
      toast.error(" password  must at least 6 characters  ", {
        transition: Zoom,
        theme: "colored",
      });
      return;
    }
    // const data = { username: username,email:email, password: password };
    // axios.post("http://localhost:3001/register", data).then((response) => {
    //      console.log(response.data);
    //      navigate('/login')
    //     });

    fetch("http://localhost:3001/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, {
            theme: "colored",
          });
        } else if (data.notmatch) {
          toast.error(data.notmatch, {
            theme: "colored",
          });
        } else {
          toast.success(data.message, {
            theme: "colored",
          });
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div style={{ background: "#E6552D" }} className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button
              type="button"
              style={{ width: "100px", color: "#E6552D" }}
              className={styles.white_btn}
            >
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Firstname"
              name="Firstname"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Lastname"
              name="Lastname"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              className={styles.input}
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className={styles.input}
            />
            <input
              type="password"
              placeholder=" Confirm Password"
              name="password"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              className={styles.input}
            />

            <button
              style={{ background: "#E6552D" }}
              type="submit"
              className={styles.green_btn}
              onClick={Register}
            >
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
