import { Box } from "@mui/material";
// import "./ValidatedForm";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
// import style from "./registration.module.css";
import Header from "../../Components/Header";
import "../../Styles/Style.css";


const UpdateFieldOwner = () => {
  const navigate = useNavigate();
  let { fieldOwnerID } = useParams();
  const [fieldOwner, setFieldOwner] = useState("");
  useEffect(() => {
    axios.get(`/fieldowners/${fieldOwnerID}`).then((response) => {
      console.log(response.data);
      setFieldOwner(response.data);
    });
  }, [fieldOwnerID]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFieldOwner((oldData) => ({ ...oldData, [name]: value }))

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setFieldOwner((oldData) => [...oldData, { ...fieldOwner }]);
    console.log(fieldOwner);
    axios({
      method: "patch",
      url: `/fieldOwners/update/${fieldOwnerID}`,
      data: fieldOwner
    }).then(data => {
      return setFieldOwner(data)
    })
    alert("The Player is updated Successfully !!");
    navigate(`../admin/fieldOwnerDetails/${fieldOwnerID}`);
  }
  return (
    <Box m="20px">
      <Header title="UPDATE FIELDOWNER" subtitle="Update a FieldOwner Profile" />
      <div id="reg" >
        <div className="w-50 mx-auto">
          <h1 className="texttik m-4 d-flex justify-content-center">Update FieldOwner</h1>
          <div className="form-style">
            <form onSubmit={handleSubmit}>
              <input type="text" name="fullName" placeholder="Enter Your Name" value={fieldOwner.fullName} onChange={handleChange}></input>
              <input type="text" name="phone" placeholder="Enter Your Phone" value={fieldOwner.phone} onChange={handleChange}></input>
              <input type="email" name="email" placeholder="Enter Your Email Address" value={fieldOwner.email} onChange={handleChange} disabled></input>
              <input type="text" name="userName" placeholder="Enter Your userName" value={fieldOwner.userName} onChange={handleChange} disabled></input>
              <input type="submit" value="UPDATE" />
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default UpdateFieldOwner;
