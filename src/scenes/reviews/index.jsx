import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import React, { useState, useEffect } from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "../../Components/Header";
import "../../Styles/Style.css";
const Reviews = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    axios.get('/games').then((response) => {
      console.log(response.data);
      setGames(response.data);
    });
  }, []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Reviews" />
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

        <table id="table">
          <tr>
            <th>Review</th>
            <th>Reviewed By</th>
            <th>Field Name</th>
            <th>Field Details</th>
          </tr>
          {games && games.map((g) => (g.price !== "0" && g.comment) && <tr key={g._id}>
            {g.comment && <td>{g.comment}</td>}
            {g.userFullName && <td>{g.userFullName}</td>}
            {g.fieldName && <td>{g.fieldName}</td>}
            <td>{<Link to={`/admin/fieldDetails/${g.fieldId}`}><IconButton>
              <InfoOutlinedIcon />
            </IconButton></Link>}</td>
          </tr>)}
        </table>
      </Box>
    </Box>
  );
};

export default Reviews;
