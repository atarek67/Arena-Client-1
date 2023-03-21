import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "../../Components/Header";
import "../../Styles/Style.css";
const PlayerDetails = () => {
  const image = "https://arena-server.onrender.com/api/images/playerPic/";
  const navigate = useNavigate();
  let { playerID } = useParams();
  const [player, setPlayer] = useState("");
  useEffect(() => {
    axios.get(`/players/${playerID}`).then((response) => {
      console.log(response.data);
      setPlayer(response.data);
    });
  }, [playerID]);
  const deletePlayer = (id) => {
    axios.delete(`/players/delete/${id}`).then(
      alert("The Player is Deleted Successfully !!")
    )
    navigate(`../admin/players`);
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title={`Player Name : ${player.fullName}`} />
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
        <h3>{<Link to={`/admin/players`}><IconButton title="Show All Players">
          <PeopleAltOutlinedIcon />
        </IconButton></Link>}
          {<IconButton title="Delete Player" onClick={() => deletePlayer(player._id)}>
            <DeleteOutlinedIcon />
          </IconButton>}
          {<Link to={`/admin/updatePlayer/${player._id}`}><IconButton title="Update Player">
            <EditOutlinedIcon />
          </IconButton></Link>}
        </h3>
        <table id="table">
          <tr>
            <td colspan="2"><img className="PPimg" src={`${image}/${player.image}`} alt="Profile Picture"></img></td>
          </tr>
          <tr>
            <th>Phone</th>
            {player.phone && <td>{player.phone}</td>}
          </tr>
          <tr>
            <th>BirthDate</th>
            {player.birthDate && <td>{player.birthDate}</td>}
          </tr>
          <tr>
            <th>Location</th>
            {player.location && <td>{player.location}</td>}
          </tr>
          <tr>
            <th>Email</th>
            {player.email && <td>{player.email}</td>}
          </tr>
          <tr>
            <th>UserName</th>
            {player.userName && <td>{player.userName}</td>}
          </tr>
        </table>
      </Box>
    </Box>
  );
};

export default PlayerDetails;
