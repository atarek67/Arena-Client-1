import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import img from '../../images/verify.svg';
import { useTranslation } from 'react-i18next'
const ConfirmEmail = () => {
  const [t,i18n]=useTranslation();
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  const { userID } = useParams();
  console.log(userID);
  useEffect(() => {
    axios.patch(`/users/changeStatus/${userID}`);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  }, []);
  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((old) => old - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [count]);
  return (
    <>
    {/* Tarek */}
      <div className="container">
        <div className="row">
          <div className="text-center font-monospace mt-5">
            <h4 className="">
              Your Email is confirmed successfully, you will be redirected to the
              login page in {count} seconds ...
            </h4>
          </div>
          <div className="col-12 d-none d-lg-block text-center m-5">
            <img src={img} alt="Verify Image" className="w-25" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmEmail;
