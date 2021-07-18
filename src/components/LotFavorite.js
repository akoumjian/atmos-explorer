import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isLotFavorited,
  addFavoriteLot,
  removeFavoriteLot,
} from "../store/favorites";

const LotFavorite = ({ lotId }) => {
  const dispatch = useDispatch();
  const isFavorited = useSelector((state) => isLotFavorited(state, lotId));
  if (isFavorited) {
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          dispatch(removeFavoriteLot(lotId));
        }}
        style={{
          width: "1rem",
          height: "1rem",
        }}
      >
        ❤️
      </div>
    );
  }

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        dispatch(addFavoriteLot(lotId));
      }}
      style={{
        width: "1rem",
        height: "1rem",
      }}
    >
      ♡
    </div>
  );
};

export default LotFavorite;
