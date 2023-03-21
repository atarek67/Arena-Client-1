import { Box, useTheme, IconButton } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
import { tokens } from "../../theme";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "../../Components/Header";
import "../../Styles/Style.css";
const Fields = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  useEffect(() => {
    axios.get('/fields').then((response) => {
      console.log(response.data);
      setFields(response.data);
    });
  }, []);
  const deleteField = (id) => {
    axios.delete(`/fields/delete/${id}`).then(
      alert("The Field is Deleted Successfully !!")
    )
    navigate(`../admin/fields`);
    window.location.reload();
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="FEILDS" subtitle="Managing the Fields" />
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

        <h3>Fields</h3>
        <table id="table">
          <tr>
            <th>Field Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Rate</th>
            <th>FieldOwner</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
          {fields && fields.map((f) => <tr key={f._id}>
            {f.fieldName && <td>{f.fieldName}</td>}
            {f.location && <td>{f.location}</td>}
            {f.price && <td>{f.price}</td>}
            {f.rate && <td>{f.rate}</td>}
            <td>{<Link to={`/admin/fieldOwnerDetails/${f.fieldOwnerId}`}>{<IconButton>
              <ManageAccountsOutlinedIcon />
            </IconButton>}</Link>}</td>
            <td>{<Link to={`/admin/fieldDetails/${f._id}`}><IconButton>
              <InfoOutlinedIcon />
            </IconButton></Link>}</td>
            <td>{<IconButton onClick={() => deleteField(f._id)}>
              <DeleteOutlinedIcon />
            </IconButton>}</td>
          </tr>)}
        </table>
      </Box>
    </Box>
  );
};

export default Fields;
