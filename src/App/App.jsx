import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import { useState } from "react";
import "../i18n"
import {useTranslation} from "react-i18next"

// import Topbar from "./scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
function App() {
  const [t,i18n]=useTranslation();
  document.body.dir = i18n.dir();

  ///////////////
  // if (typeof Node === 'function' && Node.prototype) {
  //   const originalRemoveChild = Node.prototype.removeChild;
  //   Node.prototype.removeChild = function(child) {
  //     if (child.parentNode !== this) {
  //       if (console) {
  //         console.error('Cannot remove a child from a different parent', child, this);
  //       }
  //       return child;
  //     }
  //     return originalRemoveChild.apply(this, arguments);
  //   }
  
  //   const originalInsertBefore = Node.prototype.insertBefore;
  //   Node.prototype.insertBefore = function(newNode, referenceNode) {
  //     if (referenceNode && referenceNode.parentNode !== this) {
  //       if (console) {
  //         console.error('Cannot insert before a reference node from a different parent', referenceNode, this);
  //       }
  //       return newNode;
  //     }
  //     return originalInsertBefore.apply(this, arguments);
  //   }
  // }
  //////////////
  // let [loggedInUser, setloggedInUser] = useState(null);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state);
  const [isAdmin,setIsAdmin]=useState(false)
  // console.log(myReduxData);

  // function getLoginUser() {
  //   let encodedToken = localStorage.getItem("userToken"); //Get the localStorage item by key
  //   let userData = jwtDecode(encodedToken);
  //   setloggedInUser(userData); // Hena ana bamla el loggedInUser de we msh hattmly gher law fee token
  // }

  // function logOut() {
  //   localStorage.removeItem("userToken"); //Remove the token from Local Storage
  //   setloggedInUser(null); //Change the state to null again
  // }

  // UseEffect will work after the App()
  useEffect(() => {
    //I used the useEffect to check that the token is still avaliable when I reload my Site
    if (localStorage.getItem("userToken")) {
      // console.log("there is user");

      let encodedToken = localStorage.getItem("userToken"); //Get the localStorage item by key
      let userData = jwtDecode(encodedToken);

      dispatch({ type: "setLoggedInUser", payload: userData });
      if (userData.role == "Admin") {
        setIsAdmin(true)
      }
      else setIsAdmin(false)
    }
  }, []);
  console.log(loggedInUser)
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);
  return (
    <>
      {loggedInUser?.role=="Admin" ? <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />

            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Outlet></Outlet>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider> : 
        <>
        <Navbar loggedInUser={loggedInUser}></Navbar>
      <div className="MyBody">
        <Outlet></Outlet>
      </div>
          <Footer></Footer>
        </>
      }
    
      
    </>

    // <BrowserRouter>
    //   <Navbar loggedInUser={loggedInUser} logOut={logOut} />

    //   <div className="MyBody">
    //     {/* <ProtectedRoute to='/owner-profile' element={OwnerProfile} loggedInUser={loggedInUser} ></ProtectedRoute> */}

    //     <Routes>

    //       <Route path="/" element={<Landing loggedInUser={loggedInUser} />} />
    //       <Route path="/home" element={<Landing loggedInUser={loggedInUser} />} />
    //       <Route path="/login" element={<Login getLoginUser={getLoginUser} />} />
    //       <Route path="/register" element={<Registration />} />
    //       {localStorage.getItem("userToken") ? <Route path="/owner-profile" element={<OwnerProfile />} /> :
    //         <>
    //         <Route path="/owner-profile" element={<Navigate to="/login" />} />

    //         </>
    //       }
    //       <Route path="/discover" element={<DiscoverCourts />} />
    //       <Route path="/courtDetails" element={<CourtDetails />} />
    //       <Route path="/myFields" element={<MyFields />} />

    //     </Routes>
    //   </div>
    //   <Footer />
    // </BrowserRouter>
  );
}

export default App;
