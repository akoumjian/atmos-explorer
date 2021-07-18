import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isPlanFavorited,
  addFavoritePlan,
  removeFavoritePlan,
} from "../store/favorites";

const HomeFavorite = ({ homePlanId }) => {
  const dispatch = useDispatch();
  const isFavorited = useSelector((state) =>
    isPlanFavorited(state, homePlanId)
  );

  if (isFavorited) {
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          dispatch(removeFavoritePlan(homePlanId));
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
        console.log("got here!");
        dispatch(addFavoritePlan(homePlanId));
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

export default HomeFavorite;
