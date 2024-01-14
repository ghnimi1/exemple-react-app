import "./App.css";
import React, { useEffect, createContext, useReducer } from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Users from "./users/Users";
import Login from "./authentification/Login/Login";
import Register from "./authentification/Register/Register";
import ForgotPassword from "./authentification/ForgotPassword/ForgotPassword";
import ResetPassword from "./authentification/ResetPassword/ResetPassword";
import Template from "./Template/template";
import EditUser from "./users/EditUser";
import AddUser from "./users/AddUser";
import { AuthContext } from "./helpers/AuthContext";
import Event from "./Events/pages/event";
import ListEvents from "./Events/pages/ListEvents";
import ListEventOnline from "./Salon/pages/listEventOnline";
import ViewEvent from "./Events/pages/ViewEvent";
import ViewEvenOnline from "./Salon/pages/ViewEvenOnline";
import Salon from "./Salon/pages/salon";
import ViewUser from "./users/ViewUser";
import AccountSettings from "./account-setting/index";
import Error404 from "./authentification/Error404";
import HomePage from "./components/HomePage/HomePage";
import CallPage from "./components/CallPage/CallPage";
import Dashboard from "./Dashboard/dashboard";
import AddEvent from "./AddEventUI/Addevent";
import Room from "./Room/Room";
import ViewRoom from "./Room/ViewRoom";

function App() {
  // if you able to access the value of the state and be able to change this state in any of components below here we can pass those to value={{}}

  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setAuthState(true);
    }
  }, []);

  // const routes =[{
  //   path:"/profile",component:"Profile"
  // }]

  const routes = [
    {
      path: "/",
      component: (
        <Template>
          {" "}
          <Dashboard />
        </Template>
      ),
    },
    {
      path: "/user",
      component: (
        <Template>
          <Users />
        </Template>
      ),
    },
    {
      path: "/adduser",
      component: (
        <Template>
          <AddUser />
        </Template>
      ),
    },
    {
      path: "/edituser/:id",
      component: (
        <Template>
          <EditUser />
        </Template>
      ),
    },
    {
      path: "/view",
      component: (
        <Template>
          <ViewUser />
        </Template>
      ),
    },
    {
      path: "/profile1",
      component: (
        <Template>
          <AccountSettings />
        </Template>
      ),
    },
    {
      path: "/addevent",
      component: (
        <Template>
          <AddEvent />
        </Template>
      ),
    },
    {
      path: "/PresentEvent",
      component: (
        <Template>
          <Event />
        </Template>
      ),
    },
    {
      path: "/EventOnline",
      component: (
        <Template>
          <Salon />
        </Template>
      ),
    },
    {
      path: "/listeventsPresentiel",
      component: (
        <Template>
          <ListEvents />
        </Template>
      ),
    },
    {
      path: "/listeventonline",
      component: (
        <Template>
          <ListEventOnline />
        </Template>
      ),
    },
    {
      path: "/vieweventPresent/:id",
      component: (
        <Template>
          <ViewEvent />
        </Template>
      ),
    },
    {
      path: "/vieweventOnline/:id",
      component: (
        <Template>
          <ViewEvenOnline />
        </Template>
      ),
    },
    {
      path: "/room",
      component: (
        <Template>
          <Room />
        </Template>
      ),
    },
    {
      path: "/viewroom/:id",
      component: (
        <Template>
          <ViewRoom />
        </Template>
      ),
    },
    {
      path: "/room/:id",
      component: <CallPage />,
    },
    {
      path: "/homepage",
      component: (
        <Template>
          <HomePage />
        </Template>
      ),
    },
  ];

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          {authState ? (
            <>
              <Routes>
                {routes.map((item, index) => (
                  <Route
                    key={index}
                    path={item.path}
                    element={item.component}
                  />
                ))}
              </Routes>
            </>
          ) : (
            <Routes>
              {" "}
              <Route path="/login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/forgotpass" element={<ForgotPassword />} />{" "}
              <Route path="/resetpass/:token" element={<ResetPassword />} />
              <Route path="*" element={<Error404 />} />{" "}
            </Routes>
          )}
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

// {true ? (
//        <>
//          {/* {routes.map((item,index)=>{

//        })} */}

//          <Route
//            path="/template"
//            element={
//              <Template>
//                <Dashboard />
//              </Template>
//            }
//          />

//          <Route
//            path="/user"
//            element={
//              <Template>
//                <Users />
//              </Template>
//            }
//          />
//          <Route
//            path="/adduser"
//            element={
//              <Template>
//                <AddUser />
//              </Template>
//            }
//          />
//          <Route
//            path="/edituser/:id"
//            element={
//              <Template>
//                <EditUser />
//              </Template>
//            }
//          />
//          <Route
//            path="/view"
//            element={
//              <Template>
//                <ViewUser />
//              </Template>
//            }
//          />
//          <Route
//            path="/profile1"
//            element={
//              <Template>
//                <AccountSettings />
//              </Template>
//            }
//          />
//          <Route
//            path="/addevent"
//            element={
//              <Template>
//                <AddEvent />
//              </Template>
//            }
//          />
//          <Route
//            path="/PresentEvent"
//            element={
//              <Template>
//                <Event />
//              </Template>
//            }
//          />
//          <Route
//            path="/EventOnline"
//            element={
//              <Template>
//                <Salon />
//              </Template>
//            }
//          />

//          <Route
//            path="/listeventsPresentiel"
//            element={
//              <Template>
//                <ListEvents />
//              </Template>
//            }
//          />
//          <Route
//            path="/listeventonline"
//            element={
//              <Template>
//                <ListEventOnline />
//              </Template>
//            }
//          />

//          <Route
//            path="/vieweventPresent/:id"
//            element={
//              <Template>
//                <ViewEvent />
//              </Template>
//            }
//          />
//          <Route
//            path="/vieweventOnline/:id"
//            element={
//              <Template>
//                <ViewEvenOnline />
//              </Template>
//            }
//          />
//          <Route
//            path="/room"
//            element={
//              <Template>
//                <Room />
//              </Template>
//            }
//          />
//          <Route
//            path="/viewroom/:id"
//            element={
//              <Template>
//                <ViewRoom />
//              </Template>
//            }
//          />

//          <Route path="/room/:id" element={<CallPage />} />

//          <Route path="/homepage" element={<HomePage />} />
//        </>
//      ) : (
//        <>
//          <Route path="/" element={<Login />} />
//          <Route path="/Register" element={<Register />} />
//          <Route path="/forgotpass" element={<ForgotPassword />} />
//          <Route path="/resetpass/:token" element={<ResetPassword />} />
//          <Route path="*" element={<Error404 />} />
//          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
//        </>
//      )}
