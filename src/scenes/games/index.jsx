import { Box, useTheme, IconButton } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import { tokens } from "../../theme";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from "../../Components/Header";
import "../../Styles/Style.css";
const Game = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  useEffect(() => {
    axios.get('/games').then((response) => {
      console.log(response.data);
      setGames(response.data);
    });
  }, []);
  const deleteGame = (id) => {
    axios.delete(`/games/delete/${id}`).then(
      alert("The Game is Deleted Successfully !!")
    )
    navigate(`../admin/games`);
    window.location.reload();
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="GAMES" subtitle="Managing The Games" />
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

        <h3>Games</h3>
        <table id="table">
          <tr>
            <th>Reserver</th>
            <th>Field</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
          {games && games.map((g) => <tr key={g._id}>
            <td>{<Link to={`/admin/playerDetails/${g.playerId}`}><IconButton>
              <PermIdentityOutlinedIcon />
            </IconButton></Link>}</td>
            <td>{<Link to={`/admin/fieldDetails/${g.fieldId}`}><IconButton>
              <SportsScoreOutlinedIcon />
            </IconButton></Link>}</td>
            {g.date && <td>{g.date}</td>}
            {g.hour && <td>{g.hour}</td>}
            <td>{<Link to={`/admin/gameDetails/${g._id}`}><IconButton>
              <InfoOutlinedIcon />
            </IconButton></Link>}</td>
            <td>{<IconButton onClick={() => deleteGame(g._id)}>
              <DeleteOutlinedIcon />
            </IconButton>}</td>
          </tr>)}
        </table>
      </Box>
    </Box>
  );
};

export default Game;
