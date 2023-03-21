import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SportsScoreOutlinedIcon from "@mui/icons-material/SportsScoreOutlined";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "../../Components/Header";
import "../../Styles/Style.css";
const FieldDetails = () => {
  const navigate = useNavigate();
  let { fieldID } = useParams();
  const [field, setField] = useState("");
  const [fieldOwner, setFieldOwner] = useState("");
  const [games, setGames] = useState("");
  useEffect(() => {
    async function GetData() {
      await axios.get(`/fields/${fieldID}`).then(async (field) => {
        console.log(field.data);
        setField(field.data);
        await axios.get(`/fieldOwners/${field.data.fieldOwnerId}`).then(async (fieldOwner) => {
          console.log(fieldOwner.data);
          setFieldOwner(fieldOwner.data);
          await axios.get(`/games/field/${fieldID}`).then((games) => {
            console.log(games.data);
            setGames(games.data);
          });
        });
      });
    }
    GetData();
  }, [fieldID]);
  const deleteField = (id) => {
    axios.delete(`/fields/delete/${id}`).then(
      alert("The Field is Deleted Successfully !!")
    )
    navigate(`../admin/fields`);
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title={fieldOwner.fullName} />
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
        <h3><Link to={`/admin/fields`}><IconButton title="Show All Fields">
          <SportsScoreOutlinedIcon />
        </IconButton></Link>
          <IconButton title="Delete Field" onClick={() => deleteField(field._id)}>
            <DeleteOutlinedIcon />
          </IconButton>
        </h3>
        <table id="table">
          <tr>
            <th>Field Name</th>
            <td>{field.fieldName}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>{field.location}</td>
          </tr>
          <tr>
            <th>Location On Map</th>
            <td>{field.locationOnMap}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>{field.price}</td>
          </tr>
          <tr>
            <th>Rate</th>
            <td>{field.rate}</td>
          </tr>
          <tr>
            <th colspan="2">Reviews</th>
          </tr>
          {games && games.map((g) => <tr key={g._id}>
            {g.comment && <td colspan="2">{g.comment}</td>}
          </tr>)}
        </table>
      </Box>
    </Box>
  );
};

export default FieldDetails;
