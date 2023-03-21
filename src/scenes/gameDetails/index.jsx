import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../Styles/Style.css";
const GameDetails = () => {
  const navigate = useNavigate();
  let { gameID } = useParams();
  const [game, setGame] = useState("");
  const [reserver, setReserver] = useState("");
  const [field, setField] = useState("");
  useEffect(() => {
    async function GetData() {
      await axios.get(`/games/${gameID}`).then(async (game) => {
        console.log(game.data);
        setGame(game.data);
        await axios.get(`/fields/${game.data.fieldId}`).then(async (field) => {
          console.log(field.data);
          setField(field.data);
          await axios.get(`/players/${game.data.userId}`).then(async (player) => {
            console.log(player.data);
            setReserver(player.data);
            if (!player.data._id) {
              await axios.get(`/fieldOwners/${game.data.userId}`).then((fieldOwner) => {
                console.log(fieldOwner.data);
                setReserver(fieldOwner.data);
              });
            }
          });
        });
      });
    }
    GetData();
  }, [gameID]);
  const deleteGame = (id) => {
    axios.delete(`/games/delete/${id}`).then(
      alert("The Game is Deleted Successfully !!")
    )
    navigate(`../admin/games`);
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
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
        <h3>{<Link to={`/admin/games`}><IconButton title="Show All Games">
          <SportsSoccerOutlinedIcon />
        </IconButton></Link>}
          {<IconButton title="Delete Game" onClick={() => deleteGame(game._id)}>
            <DeleteOutlinedIcon />
          </IconButton>}
        </h3>
        <table id="table">
          <tr>
            <th colspan="2">Game Info</th>
          </tr>
          <tr>
            <td>Date</td>
            <td>{game.date}</td>
          </tr>
          <tr>
            <td>Hour</td>
            <td>{game.hour}</td>
          </tr>
          <tr>
            <td>Rate</td>
            <td>{game.rate}</td>
          </tr>
          <tr>
            <td>Review</td>
            <td>{game.comment}</td>
          </tr>
          <tr>
            <th colspan="2">Reserver Info</th>
          </tr>
          <tr>
            <td>Name</td>
            <td>{reserver.fullName}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{reserver.phone}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{reserver.email}</td>
          </tr>
          <tr>
            <td>UserName</td>
            <td>{reserver.userName}</td>
          </tr>
          <tr>
            <td>Reserver Details</td>
            {reserver.role === "Player" &&
              <td>{<Link to={`/admin/playerDetails/${reserver._id}`}><IconButton title="Player Details">
                <Person2OutlinedIcon />
              </IconButton></Link>}</td>
            }
            {reserver.role === "FieldOwner" &&
              <td>{<Link to={`/admin/fieldOwnerDetails/${reserver._id}`}><IconButton title="FieldOwner Details">
                <ManageAccountsOutlinedIcon />
              </IconButton></Link>}</td>
            }
          </tr>

          <tr>
            <th colspan="2">Field Info</th>
          </tr>
          <tr>
            <td>Field Name</td>
            <td>{field.fieldName}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{field.location}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{field.price}</td>
          </tr>
          <tr>
            <td>Rate</td>
            <td>{field.rate}</td>
          </tr>
          <tr>
            <td>FieldOwner</td>
            <td>{<Link to={`/fieldOwnerDetails/${field.fieldOwnerId}`}><IconButton title="FieldOwner Details">
              <ManageAccountsOutlinedIcon />
            </IconButton></Link>}</td>
          </tr>
        </table>
      </Box>
    </Box>
  );
};

export default GameDetails;
