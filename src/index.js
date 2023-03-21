import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import "./Styles/Style.css"
import App from "./App/App";
import Landing from "./Components/Landing/Landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import OwnerProfile from "./Components/Owner Profile/OwnerProfile";
import DiscoverCourts from "./Components/Discover-Courts/DiscoverCourts";
import CourtDetails from "./Components/courtDetails/CourtDetails";
import MyFields, { myFieldLoader } from "./Components/Owner Profile/MyFields";
import PlayerProfile from "./Components/PlayerProfile/PlayerProfile";
import store from "./Redux/Store";
import { Provider } from "react-redux";
import { routeProtectionLoader } from "./Components/Owner Profile/OwnerProfile";
import { discoverFieldsLoader } from "./Components/Discover-Courts/DiscoverCourts";
import { courtLoader } from "./Components/courtDetails/CourtDetails";
import OwnerRegistration from "./Components/Owner Registration/OwnerRegistration";
import UpcomingGamesLoader from "./Components/PlayerProfile/UpcomigGames";
import ConfirmEmail from "./Components/Confirm Email/ConfirmEmail";
import ForgotPassword from "./Components/Forgot Password/ForgotPassword";
import About from "./Components/About/About"
import ErrorTest from "./Components/ErrorTest/ErrorTest"
import FieldReservations, { FieldReservationsLoader } from "./Components/Owner Profile/FieldReservations";
import ResetPassword from "./Components/Forgot Password/ResetPassword";
import Dashboard from "./scenes/dashboard/index";
import Players from "./scenes/players/index";
import UpdatePlayer from "./scenes/updatePlayer/index";
import PlayerDetails from "./scenes/playerDetails/index";
import FieldOwners from "./scenes/fieldOwners/index";
import UpdateFieldOwner from "./scenes/updateFieldOwner/index";
import FieldOwnerDetails from "./scenes/fieldOwnerDetails/index";
import Fields from "./scenes/fields/index";
import FieldDetails from "./scenes/fieldDetails/index";
import Games from "./scenes/games/index";
import GameDetails from "./scenes/gameDetails/index";
import Invoices from "./scenes/fieldsInvoices/index";
import Reviews from "./scenes/reviews/index";
import ChangePassword from "./scenes/changePassword/index";
import StripePayment from './Components/Stripe Payment/StripePayment';
import { AdminLoader } from "./scenes/dashboard/index";
import axios from 'axios';

axios.defaults.baseURL = "https://arena-server.onrender.com/api"



const routes = createBrowserRouter([
  {
    path: "/",

    element: <App />,

    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/home",
        element: <Landing />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/field-reservations/:fieldID",
        element: <FieldReservations />,
        loader: FieldReservationsLoader,
      },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Registration></Registration> },
      {
        path: "/owner-profile",
        element: <OwnerProfile></OwnerProfile>,
        loader: routeProtectionLoader,
      },
      {
        path: "/player-profile",
        element: <PlayerProfile />,
        loader: routeProtectionLoader,
        children: [{ loader: UpcomingGamesLoader }],
      },
      {
        path: "/discover",
        element: <DiscoverCourts></DiscoverCourts>,
        loader: discoverFieldsLoader,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/reset-password/:email",
        element: <ResetPassword></ResetPassword>,
      },
      {
        path: "/confirm-email/:userID",
        element: <ConfirmEmail></ConfirmEmail>,
      },
      {
        path: "/court-details/:fieldID",
        element: <CourtDetails></CourtDetails>,
        loader: courtLoader,
        children: [{ loader: routeProtectionLoader }],
      },
      {
        path: "/my-fields",
        element: <MyFields></MyFields>,
        loader: myFieldLoader,
      },
      {
        path: "/owner-register",
        element: <OwnerRegistration></OwnerRegistration>,
      },
      {
        path: "/admin",
        element: <Dashboard></Dashboard>,
        loader : AdminLoader
      },
      {
        path: "/admin/players",
        element: <Players></Players>,
        loader : AdminLoader

      },
      {
        path: "/admin/updatePlayer/:playerID",
        element: <UpdatePlayer></UpdatePlayer>,
        loader : AdminLoader

      },
      {
        path: "/admin/playerDetails/:playerID",
        element: <PlayerDetails></PlayerDetails>,
        loader : AdminLoader

      },
      {
        path: "/admin/fieldOwners",
        element: <FieldOwners></FieldOwners>,
        loader : AdminLoader

      },
      {
        path: "/admin/updateFieldOwner/:fieldOwnerID",
        element: <UpdateFieldOwner></UpdateFieldOwner>,
        loader : AdminLoader

      },
      {
        path: "/admin/fieldOwnerDetails/:fieldOwnerID",
        element: <FieldOwnerDetails></FieldOwnerDetails>,
        loader : AdminLoader

      },
      {
        path: "/admin/fields",
        element: <Fields></Fields>,
        loader : AdminLoader

      },
      {
        path: "/admin/fieldDetails/:fieldID",
        element: <FieldDetails></FieldDetails>,
        loader : AdminLoader

      },
      {
        path: "/payment/",
        element: <StripePayment></StripePayment>,
        

      },
      {
        path: "/admin/games",
        element: <Games></Games>,
        loader : AdminLoader

      },
      {
        path: "/admin/gameDetails/:gameID",
        element: <GameDetails></GameDetails>,
        loader : AdminLoader

      },
      {
        path: "/admin/invoices",
        element: <Invoices></Invoices>,
        loader : AdminLoader

      },
      {
        path: "/admin/reviews",
        element: <Reviews></Reviews>,
        loader : AdminLoader

      },
      {
        path: "/admin/changePassword",
        element: <ChangePassword></ChangePassword>,
        loader : AdminLoader

      },

      { path: "*", element: <ErrorTest /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>

);
