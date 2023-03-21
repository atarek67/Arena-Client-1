import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import jwtDecode from "jwt-decode";
import { redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SportsScoreOutlinedIcon from "@mui/icons-material/SportsScoreOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Header from "../../Components/Header";
import StatBox from "../../Components/StatBox";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [fields, setFields] = useState([]);
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [total, setTotal] = useState("");
  useEffect(() => {
    async function GetData() {
      await axios
        .get(`/fields`)
        .then(async (fields) => {
          console.log(fields.data);
          setFields(fields.data);
          await axios
            .get(`/players`)
            .then(async (players) => {
              console.log(players.data);
              setPlayers(players.data);
              await axios
                .get(`/games`)
                .then((games) => {
                  console.log(games.data);
                  setGames(games.data);
                  var total = 0;
                  for (var i = 0; i < games.data.length; i++) {
                    total += +games.data[i].price;
                  }
                  setTotal(total);
                });
            });
        });
    }
    GetData();
  }, []);

  return (
    <Box m="15px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="125px"
        gap="20px">
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <StatBox
            title={players.length}
            subtitle="Our Players"
            icon={
              <PeopleAltOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <StatBox
            title={fields.length}
            subtitle="Our Fields"
            icon={
              <SportsScoreOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <StatBox
            title={total + " EGP"}
            subtitle="Total Income"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="10px">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Games
            </Typography>
          </Box>
          {console.log(games)}
          {games?.map((game) => (
            game.price != "0" && <Box
              key={game._id}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px">
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600">
                  {game.userFullName}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {game.fieldName}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>Date  {game.date}</Box>
              <Box color={colors.grey[100]}>Hour  {game.hour} : 00</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px">
                {game.price} EGP
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;


export function AdminLoader() {
  if (localStorage.getItem("userToken")) {
    var OwnerToken = localStorage.getItem("userToken");
    let ownerData = jwtDecode(OwnerToken);
    if (ownerData.role === "Admin") {
      return null;
    } else return redirect("/");
  }
  else return redirect("/login");
}
