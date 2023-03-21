import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { Link, useNavigate } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from "react-redux";

const Topbar = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const logout = ()=>{
      localStorage.removeItem("userToken"); //Remove the token from Local Storage
    dispatch({ type: "setLoggedInUser", payload: null });
    navigate("/")
  }
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        
      </Box>
      {/* ICONS */}
      <Box display="flex">
        <IconButton title="Change Mode" onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon /> 
          )}
        </IconButton>
        <IconButton title="Logout" onClick={logout}> 
          <LogoutOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
