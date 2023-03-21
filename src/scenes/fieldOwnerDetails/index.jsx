import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "../../Components/Header";
import "../../Styles/Style.css";
import { ManageAccountsOutlined } from "@mui/icons-material";
const FieldOwnerDetails = () => {
  const image = "https://arena-server.onrender.com/api/images/fieldOwnerPic/";
  const navigate = useNavigate();
  let { fieldOwnerID } = useParams();
  const [fieldOwner, setFieldOwner] = useState("");
  useEffect(() => {
    axios.get(`/fieldOwners/${fieldOwnerID}`).then((response) => {
      console.log(response.data);
      setFieldOwner(response.data);
    });
  }, [fieldOwnerID]);
  const deleteFieldOwner = (id) => {
    axios.delete(`/fieldOwners/delete/${id}`).then(
      alert("The FieldOwner is Deleted Successfully !!")
    )
    navigate(`../admin/fieldOwners`);
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title={`FieldOwner Name : ${fieldOwner.fullName}`} />
      <Box
        m="40px 0 0 0"
        height="50vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <h3>{<Link to={`/admin/fieldOwners`}><IconButton title="Show All FieldOwners">
          <ManageAccountsOutlined />
        </IconButton></Link>}
          {<IconButton title="Delete FieldOwner" onClick={() => deleteFieldOwner(fieldOwner._id)}>
            <DeleteOutlinedIcon />
          </IconButton>}
          {<Link to={`/admin/updateFieldOwner/${fieldOwner._id}`}><IconButton title="Update FieldOwner">
            <EditOutlinedIcon />
          </IconButton></Link>}
        </h3>
        <table id="table">
          <tr>
            <td colspan="2"><img className="PPimg" src={`${image}/${fieldOwner.image}`} alt="Profile Picture"></img></td>
          </tr>
          <tr>
            <th>Phone</th>
            {fieldOwner.phone && <td>{fieldOwner.phone}</td>}
          </tr>
          <tr>
            <th>Email</th>
            {fieldOwner.email && <td>{fieldOwner.email}</td>}
          </tr>
          <tr>
            <th>UserName</th>
            {fieldOwner.userName && <td>{fieldOwner.userName}</td>}
          </tr>
        </table>
      </Box>
    </Box>
  );
};

export default FieldOwnerDetails;
