import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LotCard from "./LotCard";
import { fetchLots, selectAllLots } from "../store/lots";

const LotsPage = () => {
  const dispatch = useDispatch();
  const lots = useSelector(selectAllLots);
  const lotsStatus = useSelector((state) => state.lots.status);
  const lotsError = useSelector((state) => state.lots.error);
  const [renderedLots, setRenderedLots] = useState(<div>Loading...</div>);

  useEffect(() => {
    // Load initial data
    if (lotsStatus === "idle") {
      dispatch(fetchLots());
    }
  }, [lotsStatus, dispatch]);

  useEffect(() => {
    let content = "";
    if (lotsStatus === "idle") {
      content = <div>Loading...</div>;
    } else if (lotsStatus === "failed") {
      content = <div>{lotsError}</div>;
    } else if (lotsStatus === "succeeded") {
      content = lots.map((lot) => {
        return <LotCard key={lot.lotId} lot={lot}></LotCard>;
      });
    }
    setRenderedLots(content);
  }, [lotsStatus, lots, lotsError]);
  return (
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
  );
};

export default LotsPage;
