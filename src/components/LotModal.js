import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { fetchLots, selectLotById } from "../store/lots";
import { splitAddress, acresToSQFT } from "../utils/lotUtils";
import CompatibleHomePlans from "./CompatibleHomePlans";
import LotFavorite from "./LotFavorite";

// from https://reactrouter.com/web/example/query-parameters
// Create a hook to react to the query param part of the url
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const LotModal = () => {
  let query = useQuery();
  const dispatch = useDispatch();
  const lotsStatus = useSelector((state) => state.lots.status);
  const lot = useSelector((state) =>
    selectLotById(state, query.get("selectedLot"))
  );
  const [content, setContent] = useState(<div>Loading...</div>);

  useEffect(() => {
    // Load initial data
    if (lotsStatus === "idle") {
      dispatch(fetchLots());
    }
  }, [lotsStatus, dispatch]);

  useEffect(() => {
    if (lot) {
      setContent(
        <div
          style={{
            maxWidth: "80vw",
            maxHeight: "80vh",
            backgroundColor: "rgb(255, 255, 255)",
            borderRadius: "1rem",
            overflow: "scroll",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img style={{ width: "50%" }} src={lot.image} alt={lot.address} />
            <div style={{ padding: "1rem" }}>
              <h3>{splitAddress(lot.address)[0]}</h3>
              <div>{splitAddress(lot.address)[1]}</div>
              <div>
                {lot.acres} acres - {acresToSQFT(lot.acres)} sqft
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
              <div style={{ position: "absolute", top: "5px", right: "5px" }}>
                <LotFavorite lotId={lot.lotId}></LotFavorite>
              </div>
            </div>
          </div>
          <CompatibleHomePlans lotId={lot.lotId}></CompatibleHomePlans>
        </div>
      );
    }
  }, [lot]);
  if (!query.get("selectedLot")) {
    return null;
  }

  return <Modal>{content}</Modal>;
};

export default LotModal;
