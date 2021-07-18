import React from "react";
import { useLocation } from "react-router";
import Card from "./Card";
import HomeFavorite from "./HomeFavorite";

const HomePlanCard = ({ homePlan }) => {
  const location = useLocation();
  return (
    <Card
      to={{
        pathname: location.pathname,
        search: `?selectedHomePlan=${homePlan.homePlanId}`,
      }}
    >
      <div style={{ position: "absolute", top: "5px", right: "5px" }}>
        <HomeFavorite homePlanId={homePlan.homePlanId}></HomeFavorite>
      </div>
      <img style={{ width: "100%" }} src={homePlan.image} alt={homePlan.name} />
      <div style={{ padding: "1rem" }}>
        <h3>{homePlan.name}</h3>
        <div>
          <span>{homePlan.numBeds} beds</span>-<span>{homePlan.numBaths}</span>-
          <span>{homePlan.sqft}</span>
        </div>
        <div>
          {homePlan.tags.map((tag) => {
            return <span>{tag}</span>;
          })}
        </div>
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
          }}
        >
          {homePlan.description}
        </div>
      </div>
    </Card>
  );
};

export default HomePlanCard;
