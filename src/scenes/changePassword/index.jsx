import { Box } from "@mui/material";
// import "./ValidatedForm";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// import { useNavigate  } from "react-router-dom";
// import style from "./registration.module.css";
import Header from "../../Components/Header";
import "../../Styles/Style.css";


const ChangePassword = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});
  const handleChange = (e) => {
    const { value, name } = e.target;
    setAdmin((oldData) => ({ ...oldData, [name]: value }))
  }
  const handleSubmit = (e) => {
    console.log(admin);
    e.preventDefault();
    if (admin.newPassword === admin.newPassword2) {
      axios({
        method: "patch",
        url: "/users/updateUserPassword/640f9c2000b27079a9ced0cf",
        data: admin
      }).then(data => {
        return setAdmin(data)
      })
      alert("The Password is changed!!");
      navigate(`../admin`);
      window.location.reload();
    } else {
      alert("Rewrite The Password correctly");
    }
  }
  return (
    <Box m="20px">
      <Header title="CREATE PLAYER" subtitle="Create a New Player Profile" />
      <div id="reg" >
        <div className="w-50 mx-auto">
          <h1 className="texttik m-4 d-flex justify-content-center">Change Password</h1>
          <div className="form-style">
            <form onSubmit={handleSubmit}>
              <input type="password" name="oldPassword" placeholder="Enter Your Old Password" onChange={handleChange}></input>
              <input type="password" name="newPassword" placeholder="Enter Your New Password" onChange={handleChange}></input>
              <input type="password" name="newPassword2" placeholder="Rewrite Your New Password" onChange={handleChange}></input>
              <input type="submit" value="Change" />
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ChangePassword;
