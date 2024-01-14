import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TodayIcon from "@mui/icons-material/Today";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Collapse } from "@mui/material";

function Template({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");

  const getSingleUser = async () => {
    const { data } = await axios.get(`http://localhost:3001/user/${user?.id}`);
    setFirstName(data.firstname);
    setLastName(data.lastname);
    setAvatar(data.picture);
    setRole(data.role);
  };

  useEffect(() => {
    getSingleUser();
  }, [user?.id]);

  let location = useLocation();
  console.log({ location });

  const sideBarItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: "fa fa-home",
    },
    {
      label: "Event",
      icon: "fa fa-calendar",
      subItems: [
        {
          label: "Add Event",
          path: "/addevent",
        },
        {
          label: "Present Events",
          path: "/listeventsPresentiel",
        },

        {
          label: "Online Events",
          path: "/listeventonline",
        },
      ],
    },
    {
      label: "Users",
      path: "/user",
      icon: "fa fa-users",
    },
    {
      label: "Salon",
      path: "/room",
      icon: "fa fa-video-camera",
    },
    {
      label: "Join salon",
      path: "/homepage",
      icon: "fa fa-user-plus",
    },
  ];
  // const user=localStorage.getItem("user")
  return (
    <div className="container-scroller">
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="logo text-center sidebar-brand-wrapper d-flex align-items-center">
          <span
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Talan
          </span>
          <a
            className="sidebar-brand brand-logo-mini pl-4 pt-3"
            href="index.html"
          >
            <img src="assets/images/logo-mini.svg" alt="logo" />
          </a>
        </div>

        <ul className="nav">
          {sideBarItems.map((i, idx) => {
            if (user?.role !== "Administrateur" && i.label == "Users")
              return null;
            return (
              <>
                <li
                  style={{
                    height: 60,
                    display: "flex",
                    alignitems: "center",
                  }}
                  className="nav-item"
                >
                  <>
                    <a
                      style={{ width: "100%" }}
                      className={`nav-link ${
                        location.pathname === i.path ? "active" : ""
                      } `}
                      href={i.path ? i.path : "#event"}
                      data-toggle={i.path ? "" : "collapse"}
                      aria-expanded={i.path ? "" : "false"}
                      aria-controls={i.path ? "" : "ui-basic"}
                    >
                      <i className={i.icon}></i>
                      <span
                        className={`menu-title ${
                          location.pathname === i.path ? "active" : ""
                        }`}
                      >
                        {i.label}
                      </span>
                      {i.subItems && <i className="menu-arrow"></i>}
                    </a>
                  </>
                </li>
                {i.subItems && (
                  <div
                    style={{ marginLeft: 15 }}
                    className="collapse"
                    id="event"
                  >
                    <ul className="nav flex-column sub-menu">
                      {i.subItems.map((itm, idex) => (
                        <li className="nav-item" key={idex}>
                          <a
                            className={`nav-link ${
                              location.pathname === itm.path ? "active" : ""
                            }`}
                            href={itm.path}
                          >
                            {itm.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            );
          })}
        </ul>
      </nav>

      <div className="container-fluid page-body-wrapper">
        <div id="theme-settings" className="settings-panel">
          <i className="settings-close mdi mdi-close"></i>
          <p className="settings-heading">SIDEBAR SKINS</p>
          <div
            className="sidebar-bg-options selected"
            id="sidebar-default-theme"
          >
            <div className="img-ss rounded-circle bg-light border mr-3"></div>{" "}
            Default
          </div>
          <div className="sidebar-bg-options" id="sidebar-dark-theme">
            <div className="img-ss rounded-circle bg-dark border mr-3"></div>{" "}
            Dark
          </div>
          <p className="settings-heading mt-2">HEADER SKINS</p>
          <div className="color-tiles mx-0 px-4">
            <div className="tiles light"></div>
            <div className="tiles dark"></div>
          </div>
        </div>
        <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
          <div className="navbar-menu-wrapper d-flex align-items-stretch justify-content-between">
            <a
              className="navbar-brand brand-logo-mini align-self-center d-lg-none"
              href="index.html"
            >
              <img src="assets/images/logo-mini.svg" alt="logo" />
            </a>
            {/*<button
              className="navbar-toggler navbar-toggler align-self-center mr-5"
              type="button"
              data-toggle="minimize"
            >
              <i className="mdi mdi-menu"></i>
            </button>*/}
            <ul className="navbar-nav"></ul>
            <ul className="navbar-nav navbar-nav-right ml-lg-auto">
              <li className="nav-item nav-profile dropdown border-0">
                <a
                  className="nav-link dropdown-toggle"
                  id="profileDropdown"
                  data-toggle="dropdown"
                >
                  <img
                    style={{ marginLeft: "25%" }}
                    className="nav-profile-img mr-2"
                    alt=""
                    src={`http://localhost:3001/Images/${avatar}`}
                  />
                  <span className="profile-name">{role}</span>
                </a>
                <div
                  className="dropdown-menu navbar-dropdown w-100"
                  aria-labelledby="profileDropdown"
                >
                  <a className="dropdown-item" href="/login">
                    <i
                      className="mdi mdi-logout mr-2 text-primary"
                      onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                      }}
                    >
                      logout
                    </i>
                  </a>
                  <a className="dropdown-item" href="#">
                    <Link to="/profile1">
                      <i className="mdi mdi-cached mr-2 text-success"></i>{" "}
                      Profile
                    </Link>
                  </a>
                </div>
              </li>
            </ul>
            <button
              className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              data-toggle="offcanvas"
            >
              <span className="mdi mdi-menu"></span>
            </button>
          </div>
        </nav>
        <div className="main-panel">
          <div className="row mt-2 mx-1">
            <div className="col-xl-12 col-xs-6 grid-margin stretch-card">
              {/* content will be changed as we change th children */}

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template;
