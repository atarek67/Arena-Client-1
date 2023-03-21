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
const Player = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    axios.get('/players').then((response) => {
      console.log(response.data);
      setPlayers(response.data);
    });
  }, []);
  const deletePlayer = (id) => {
    axios.delete(`/players/delete/${id}`).then(
      alert("The Player is Deleted Successfully !!")
    )
    navigate(`../admin/players`);
    window.location.reload();
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="PLAYERS" subtitle="Managing the Players" />
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

        <h3>Players</h3>
        <table id="table">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {players && players.map((p) => <tr key={p._id}>
            {p.fullName && <td>{p.fullName}</td>}
            {p.phone && <td>{p.phone}</td>}
            {p.email && <td>{p.email}</td>}
            <td>{<Link to={`/admin/playerDetails/${p._id}`}><IconButton>
              <InfoOutlinedIcon />
            </IconButton></Link>}</td>
            <td>{<Link to={`/admin/updatePlayer/${p._id}`}><IconButton>
              <EditOutlinedIcon />
            </IconButton></Link>}</td>
            <td>{<IconButton onClick={() => deletePlayer(p._id)}>
              <DeleteOutlinedIcon />
            </IconButton>}</td>
          </tr>)}
        </table>
      </Box>
    </Box>
  );
};

export default Player;
