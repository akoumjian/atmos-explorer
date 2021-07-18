import React from "react";
import { createPortal } from "react-dom";
import { useHistory } from "react-router";

const Modal = ({ children }) => {
  const history = useHistory();

  const closeModal = (e) => {
    e.stopPropagation();
    history.push(window.location.pathanme);
  };
  return createPortal(
    <div
      onClick={closeModal}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={(e) => {
          /* hacky way to guarantee clicking in modal doesn't trigger closeModal */
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal_root")
  );
};

export default Modal;
