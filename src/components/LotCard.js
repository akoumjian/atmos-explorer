import React from "react";
import { useLocation } from "react-router";
import Card from "./Card";
import { splitAddress, acresToSQFT } from "../utils/lotUtils";
import LotFavorite from "./LotFavorite";

const LotCard = ({ lot }) => {
  const location = useLocation();
  const [street, localityProvince] = splitAddress(lot.address);
  const lotSQFT = acresToSQFT(lot.acres);
  return (
    <Card
      to={{
        pathname: location.pathname,
        search: `?selectedLot=${lot.lotId}`,
      }}
    >
      <div style={{ position: "absolute", top: "5px", right: "5px" }}>
        <LotFavorite lotId={lot.lotId}></LotFavorite>
      </div>
      <img style={{ width: "100%" }} src={lot.image} alt={lot.address} />
      <div style={{ padding: "1rem" }}>
        <h3>{street}</h3>
        <div>{localityProvince}</div>
        <div>
          {lot.acres} acres - {lotSQFT} sqft
        </div>
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
          }}
        >
          {lot.description}
        </div>
      </div>
    </Card>
  );
};

export default LotCard;
