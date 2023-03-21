import React from "react";

import RegistrationValidation from "./ValidatedForm";

export default function OwnerRegistration({ loggedIn }) {
  
  return <RegistrationValidation loggedIn={loggedIn} />;
}
