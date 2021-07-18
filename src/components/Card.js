import React from "react";
import { Link } from "react-router-dom";

// Represents a styled link card
const Card = ({ to, children }) => {
  return (
    <Link
      to={to}
      style={{
        width: "15rem",
        height: "30rem",
        border: "1px solid black",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        textDecoration: "none",
        color: "rgb(0, 0, 0)",
      }}
    >
      {children}
    </Link>
  );
};

export default Card;
