import { Box } from "@mui/material";
// import "./ValidatedForm";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
// import style from "./registration.module.css";
import Header from "../../Components/Header";
import "../../Styles/Style.css";


const UpdatePlayer = () => {
  const navigate = useNavigate();
  let { playerID } = useParams();
  const [player, setPlayer] = useState("");
  useEffect(() => {
    axios.get(`/players/${playerID}`).then((response) => {
      console.log(response.data);
      setPlayer(response.data);
    });
  }, [playerID]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setPlayer((oldData) => ({ ...oldData, [name]: value }))

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayer((oldData) => [...oldData, { ...player }]);
    console.log(player);
    axios({
      method: "patch",
      url: `/players/update/${playerID}`,
      data: player
    }).then(data => {
      return setPlayer(data)
    })
    alert("The Player is updated Successfully !!");
    navigate(`../admin/playerDetails/${playerID}`);
  }
  return (
    <Box m="20px">
      <Header title="UPDATE PLAYER" subtitle="Update a Player Profile" />
      <div id="reg" >
        <div className="w-50 mx-auto">
          <h1 className="texttik m-4 d-flex justify-content-center">Update Player</h1>
          <div className="form-style">
            <form onSubmit={handleSubmit}>
              <input type="text" name="fullName" placeholder="Enter Your Name" value={player.fullName} onChange={handleChange}></input>
              <input type="text" name="phone" placeholder="Enter Your Phone" value={player.phone} onChange={handleChange}></input>
              <input type="text" name="birthDate" placeholder="Enter Your birthDate like yyyy/mm/dd" value={player.birthDate} onChange={handleChange}></input>
              <input type="text" name="location" placeholder="Enter Your location" value={player.location} onChange={handleChange}></input>
              <input type="email" name="email" placeholder="Enter Your Email Address" value={player.email} onChange={handleChange} disabled></input>
              <input type="text" name="userName" placeholder="Enter Your userName" value={player.userName} onChange={handleChange} disabled></input>
              <input type="submit" value="UPDATE" />
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default UpdatePlayer;
