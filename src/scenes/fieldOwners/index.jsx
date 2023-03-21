import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import React, { useState, useEffect } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "../../Components/Header";
import "../../Styles/Style.css";
const FieldOwners = () => {
  const navigate = useNavigate();
  const [fieldOwners, setFieldOwners] = useState([]);
  useEffect(() => {
    axios.get('/fieldOwners').then((response) => {
      console.log(response.data);
      setFieldOwners(response.data);
    });
  }, []);
  const deleteFieldOwner = (id) => {
    axios.delete(`/fieldOwners/delete/${id}`).then(
      alert("The FieldOwner is Deleted Successfully !!")
    )
    navigate(`../admin/fieldOwners`);
    window.location.reload();
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="FIELDOWNERS" subtitle="Managing the FieldOwners" />
      <Box
        m="40px 0 0 0"
        height="75vh"
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

        <h3>FieldOwners</h3>
        <table id="table">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {fieldOwners && fieldOwners.map((fo) => <tr key={fo._id}>
            {fo.fullName && <td>{fo.fullName}</td>}
            {fo.phone && <td>{fo.phone}</td>}
            {fo.email && <td>{fo.email}</td>}
            <td>{<Link to={`/admin/fieldOwnerDetails/${fo._id}`}><IconButton>
              <InfoOutlinedIcon />
            </IconButton></Link>}</td>
            <td>{<Link to={`/admin/updateFieldOwner/${fo._id}`}><IconButton>
              <EditOutlinedIcon />
            </IconButton></Link>}</td>
            <td>{<IconButton onClick={() => deleteFieldOwner(fo._id)}>
              <DeleteOutlinedIcon />
            </IconButton>}</td>
          </tr>)}
        </table>
      </Box>
    </Box>
  );
};

export default FieldOwners;
