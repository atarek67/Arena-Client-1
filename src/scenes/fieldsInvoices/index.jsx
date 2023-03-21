import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { Link } from 'react-router-dom';
import Header from "../../Components/Header";
import "../../Styles/Style.css";
const FieldsInvoices = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  useEffect(() => {
    axios.get('/fields/valid/0').then((response) => {
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
  const updateStatus = (id) => {
    axios.patch(`/fields/updateFieldStatus/${id}`).then(
      alert("The Field is Approved Successfully !!")
    )
    navigate(`../admin/fields`);
    window.location.reload();
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="FEILDS" subtitle="Managing pending fields" />
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

        <h3>Invalid Fields</h3>
        <table id="table">
          <tr>
            <th>Field Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>FieldOwner</th>
            <th>Confirm</th>
            <th>Deny</th>
          </tr>
          {fields.map((f) => <tr key={f._id}>
            {f.fieldName && <td>{f.fieldName}</td>}
            {f.location && <td>{f.location}</td>}
            {f.price && <td>{f.price}</td>}
            <td>{<Link to={`/admin/fieldOwnerDetails/${f.fieldOwnerId}`}><IconButton>
              <ManageAccountsOutlinedIcon />
            </IconButton></Link>}</td>
            <td>{<IconButton onClick={() => updateStatus(f._id)}>
              <CheckOutlinedIcon />
            </IconButton>}</td>
            <td>{<IconButton onClick={() => deleteField(f._id)}>
              <ClearOutlinedIcon />
            </IconButton>}</td>
          </tr>)}
        </table>
      </Box>
    </Box>
  );
};

export default FieldsInvoices;
