import React from "react";
import classes from "./Modal.module.css";
function Modal(props) {
  //medhat
  function closeHandler() {
    if (props.setFormIsVisible) props.setFormIsVisible(false);
    if (props.setUpdateFormIsVisible) props.setUpdateFormIsVisible(false);
    if (props.setPlayerUpdateFormIsVisible)
      props.setPlayerUpdateFormIsVisible(false);
    if (props.setPaymentIsVisible) props.setPaymentIsVisible(false);
    if (props.setShowUpdateForm) props.setShowUpdateForm(false);
    if (props.setShowComments) props.setShowComments(false);
  }
  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} on />
      <dialog open className={classes.modal}>
        {props.children}
      </dialog>
    </>
  );
}

export default Modal;
