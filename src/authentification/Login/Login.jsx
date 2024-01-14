import React, { useState, useContext } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { toast, Zoom } from "react-toastify";
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const login = (e) => {
    e.preventDefault();

    // const data={email:email,password:password};
    // axios.post("http://localhost:3001/login",data).then((response)=>{
    //     console.log(response.data.token)

    //   localStorage.setItem("accessToken",response.data.token.token)
    //   setAuthState(true)
    //   navigate('/template')

    //     });
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("email invalid ", {
        transition: Zoom,
        theme: "colored",
      });
      return;
    }
    fetch("http://localhost:3001/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password,
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
        if (data.error) {
          toast.error(data.error, {
            theme: "colored",
          });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setAuthState(true);
          toast.success("signedin successfuly", {
            theme: "colored",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
              className={styles.input}
            />

            <button
              type="submit"
              className={styles.green_btn}
              style={{ backgroundColor: "#E6552D" }}
              onClick={login}
            >
              Sing In
            </button>
            <h6>
              <Link style={{ color: "#E6552D" }} to="/forgotpass">
                Forgot password ?
              </Link>
            </h6>
          </form>
        </div>
        <div className={styles.right} style={{ backgroundColor: "#E6552D" }}>
          <h1>New Here ?</h1>
          <Link to="/register">
            <button
              type="button"
              style={{ width: "100px", color: "#E6552D" }}
              className={styles.white_btn}
            >
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
