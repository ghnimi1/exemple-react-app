// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Profile.css";
// import axios from "axios";
// import Grid from "@mui/material/Grid";
// import { toast } from "react-toastify";
// import TextField from "@mui/material/TextField";
// function Profile() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const { id } = user;

//   const [firstname, setFirstName] = useState("");
//   const [lastname, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [grade, setGrade] = useState("");
//   const [image, setImage] = useState("");

//   useEffect(() => {
//     const getSingleUser = async () => {
//       const { data } = await axios.get(`http://localhost:3001/user/${id}`);
//       setFirstName(data.firstname);
//       setLastName(data.lastname);
//       setEmail(data.email);
//       setPhone(data.telephone);
//       setGrade(data.grade);
//       setImage(data.picture);
//     };

//     console.log(image);

//     getSingleUser();
//   }, [id]);

//   const updateUser = (e) => {
//     e.preventDefault();

//     // update by put request
//     const formData = new FormData();
//     formData.append("firstname", firstname);
//     formData.append("lastname", lastname);
//     formData.append("email", email);
//     formData.append("telephone", phone);
//     formData.append("grade", grade);
//     formData.append("picture", image);
//     const config = {
//       headers: {
//         "content-type": "multipart/form-data",
//       },
//     };
//     axios
//       .put(`http://localhost:3001/user/${id}`, formData, config)
//       .then((response) => {
//         if (response.status === 200) {
//           console.log(response);
//           toast.success(response.data.message);
//         }
//       });
//   };

//   return (
//     <div class="container">
//       <div class="row">
//         <div class="col-lg-4">
//           <div class="profile-card-4 z-depth-3">
//             <div class="card">
//               <div class="card-body text-center bg-primary rounded-top">
//                 <div class="user-box">
//                   <img src={image} alt="user avatar" />
//                 </div>
//                 <h5 class="mb-1 text-white">{firstname}</h5>
//                 <h6 class="text-light">{grade}</h6>
//               </div>
//               <div class="card-body">
//                 <ul class="list-group shadow-none">
//                   <li class="list-group-item">
//                     <div class="list-icon">
//                       <i class="fa fa-phone-square"></i>
//                     </div>
//                     <div class="list-details">
//                       <span>{phone}</span>
//                       <small>Mobile Number</small>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="list-icon">
//                       <i class="fa fa-envelope"></i>
//                     </div>
//                     <div class="list-details">
//                       <span>{email}</span>
//                       <small>Email Address</small>
//                     </div>
//                   </li>
//                 </ul>
//                 <div class="row text-center mt-4"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div class="col-lg-8">
//           <div class="c    ard z-depth-3">
//             <div class="card-body">
//               <ul class="nav nav-pills nav-pills-primary nav-justified">
//                 <li class="nav-item">
//                   <a
//                     href="javascript:void();"
//                     data-target="#profile"
//                     data-toggle="pill"
//                     class="nav-link active show"
//                   >
//                     <i class="icon-user"></i>{" "}
//                     <span class="hidden-xs">Profile</span>
//                   </a>
//                 </li>
//                 <li class="nav-item">
//                   <a
//                     href="javascript:void();"
//                     data-target="#messages"
//                     data-toggle="pill"
//                     class="nav-link"
//                   >
//                     <i class="icon-envelope-open"></i>{" "}
//                     <span class="hidden-xs">Messages</span>
//                   </a>
//                 </li>
//                 <li class="nav-item">
//                   <a
//                     href="javascript:void();"
//                     data-target="#edit"
//                     data-toggle="pill"
//                     class="nav-link"
//                   >
//                     <i class="icon-note"></i>{" "}
//                     <span class="hidden-xs">Edit</span>
//                   </a>
//                 </li>
//               </ul>
//               <div class="tab-content p-3">
//                 <div class="tab-pane active show" id="profile">
//                   <h5 class="mb-3">User Profile</h5>
//                   <div class="row">
//                     <div class="col-md-6">
//                       <h6>About</h6>
//                       <p>Web Designer, UI/UX Engineer</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="tab-pane" id="messages">
//                   <div class="alert alert-info alert-dismissible" role="alert">
//                     <button type="button" class="close" data-dismiss="alert">
//                       ×
//                     </button>
//                     <div class="alert-icon">
//                       <i class="icon-info"></i>
//                     </div>
//                     <div class="alert-message">
//                       <span>
//                         <strong>Info!</strong> Lorem Ipsum is simply dummy text.
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="tab-pane" id="edit">
//                   <form
//                     onSubmit={updateUser}
//                     method="POST"
//                     encType="multipart/form-data"
//                   >
//                     <div class="form-group row">
//                       <label class="col-lg-3 col-form-label form-control-label">
//                         First name
//                       </label>
//                       <div class="col-lg-9">
//                         <input
//                           class="form-control"
//                           type="text"
//                           onChange={(e) => setFirstName(e.target.value)}
//                           value={firstname}
//                         />
//                       </div>
//                     </div>

//                     <div class="form-group row">
//                       <label class="col-lg-3 col-form-label form-control-label">
//                         Last name
//                       </label>
//                       <div class="col-lg-9">
//                         <input
//                           class="form-control"
//                           type="text"
//                           onChange={(e) => setLastName(e.target.value)}
//                           value={lastname}
//                         />
//                       </div>
//                     </div>
//                     <div class="form-group row">
//                       <label class="col-lg-3 col-form-label form-control-label">
//                         Email
//                       </label>
//                       <div class="col-lg-9">
//                         <input
//                           class="form-control"
//                           type="email"
//                           onChange={(e) => setEmail(e.target.value)}
//                           value={email}
//                         />
//                       </div>
//                     </div>
//                     <div class="form-group row">
//                       <label class="col-lg-3 col-form-label form-control-label">
//                         Change profile
//                       </label>
//                       <div class="col-lg-9" id="fileName">
//                         <input
//                           class="form-control"
//                           type="file"
//                           name="picture"
//                           onChange={(e) => setImage(e.target.files[0])}
//                         />
//                       </div>
//                     </div>
//                     <div class="form-group row">
//                       <label class="col-lg-3 col-form-label form-control-label">
//                         Website
//                       </label>
//                       <div class="col-lg-9">
//                         <Grid item xs={12} sm={6}>
//                           <TextField
//                             fullWidth
//                             label="Username"
//                             placeholder="johnDoe"
//                             defaultValue="johnDoe"
//                           />
//                         </Grid>
//                       </div>
//                     </div>
//                     <div class="form-group row">
//                       <label class="col-lg-3 col-form-label form-control-label">
//                         phone
//                       </label>
//                       <div class="col-lg-9">
//                         <input
//                           class="form-control"
//                           type="text"
//                           onChange={(e) => setPhone(e.target.value)}
//                           value={phone}
//                           placeholder="Street"
//                         />
//                       </div>
//                     </div>
//                     <div class="form-group row">
//                       <label class="col-lg-3 col-form-label form-control-label"></label>
//                       <div class="col-lg-6">
//                         <input
//                           class="form-control"
//                           type="text"
//                           value=""
//                           placeholder="City"
//                         />
//                       </div>
//                       <div class="col-lg-3">
//                         <input
//                           class="form-control"
//                           type="text"
//                           value=""
//                           placeholder="State"
//                         />
//                       </div>
//                     </div>

//                     <div class="form-group row">
//                       <label class="col-lg-3 col-form-label form-control-label">
//                         grade
//                       </label>
//                       <div class="col-lg-9">
//                         <input
//                           class="form-control"
//                           type="text"
//                           onChange={(e) => setGrade(e.target.value)}
//                           value={grade}
//                         />
//                       </div>
//                     </div>
//                     <div class="form-group row">
//                       <label class="col-lg-3 col-form-label form-control-label">
//                         Password
//                       </label>
//                       <div class="col-lg-9">
//                         <input
//                           class="form-control"
//                           type="password"
//                           value="11111122333"
//                         />
//                       </div>
//                     </div>
//                     <div class="form-group row">
//                       <label class="col-lg-3 col-form-label form-control-label">
//                         Confirm password
//                       </label>
//                       <div class="col-lg-9">
//                         <input
//                           class="form-control"
//                           type="password"
//                           value="11111122333"
//                         />
//                       </div>
//                     </div>
//                     <div class="form-group row">
//                       <label class="col-lg-3 col-form-label form-control-label"></label>
//                       <div class="col-lg-9">
//                         <button
//                           type="button"
//                           className="btn btn-primary btn-rounded btn-fw"
//                           style={{ width: "20px" }}
//                           onClick={updateUser}
//                         >
//                           {" "}
//                           Save Change{" "}
//                         </button>
//                         <button
//                           type="button"
//                           className="btn btn-primary btn-rounded btn-fw"
//                           style={{ width: "20px" }}
//                         >
//                           {" "}
//                           Annuler
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
