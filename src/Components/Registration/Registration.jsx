import React from "react";

import RegistrationValidation from "./ValidatedForm";

export default function Registration({ loggedIn }) {
  
  return <RegistrationValidation loggedIn={loggedIn} />;
}
