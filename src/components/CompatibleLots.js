import React, { useEffect, useState } from "react";
import LotCard from "./LotCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchLots, selectAllLots } from "../store/lots";
import {
  fetchCombinations,
  selectComboByHomePlan,
} from "../store/combinations";

const CompatibleLots = ({ homePlanId }) => {
  const dispatch = useDispatch();
  const allLots = useSelector(selectAllLots);
  const lotsStatus = useSelector((state) => state.lots.status);
  const comboStatus = useSelector((state) => state.combinations.status);
  const compatibleLotIds = useSelector((state) =>
    selectComboByHomePlan(state, homePlanId)
  );
  const [compatibleLots, setCompatibleLots] = useState();
  const [renderedLots, setRenderedLots] = useState();

  useEffect(() => {
    // Make sure we have the lot data
    if (lotsStatus === "idle") {
      dispatch(fetchLots());
    }
    if (comboStatus === "idle") {
      dispatch(fetchCombinations());
    }
  }, [lotsStatus, comboStatus, dispatch]);

  useEffect(() => {
    let newLots = [];
    if (compatibleLotIds) {
      newLots = allLots.filter((lot) => compatibleLotIds.includes(lot.lotId));
    }
    setCompatibleLots(newLots);
  }, [compatibleLotIds, allLots]);

  useEffect(() => {
    if (!compatibleLots) {
      return;
    }
    const newLots = compatibleLots.map((lot) => {
      return <LotCard lot={lot}></LotCard>;
    });
    setRenderedLots(newLots);
  }, [compatibleLots]);

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Compatible Lots</h2>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          padding: "2rem",
          justifyContent: "space-between",
        }}
      >
        {renderedLots}
      </div>
    </div>
  );
};

export default CompatibleLots;
