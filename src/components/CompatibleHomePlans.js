import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomePlans, selectAllHomePlans } from "../store/homePlans";
import { fetchCombinations, selectComboByLot } from "../store/combinations";
import HomePlanCard from "./HomePlanCard";

const CompatibleHomePlans = ({ lotId }) => {
  const dispatch = useDispatch();
  const allHomePlans = useSelector(selectAllHomePlans);
  const homePlansStatus = useSelector((state) => state.homePlans.status);
  const comboStatus = useSelector((state) => state.combinations.status);
  const compatibleHomePlanIds = useSelector((state) =>
    selectComboByLot(state, lotId)
  );
  const [compatibleHomePlans, setCompatibleHomePlans] = useState();
  const [renderedHomePlans, setRenderedHomePlans] = useState();

  useEffect(() => {
    // Make sure we have the lot data
    if (homePlansStatus === "idle") {
      dispatch(fetchHomePlans());
    }
    if (comboStatus === "idle") {
      dispatch(fetchCombinations());
    }
  }, [homePlansStatus, comboStatus, dispatch]);

  useEffect(() => {
    let newHomePlans = [];
    if (compatibleHomePlanIds) {
      newHomePlans = allHomePlans.filter((homePlan) =>
        compatibleHomePlanIds.includes(homePlan.homePlanId)
      );
    }
    setCompatibleHomePlans(newHomePlans);
  }, [compatibleHomePlanIds, allHomePlans]);

  useEffect(() => {
    if (!compatibleHomePlans) {
      return;
    }
    const newHomePlans = compatibleHomePlans.map((homePlan) => {
      return <HomePlanCard homePlan={homePlan}></HomePlanCard>;
    });
    setRenderedHomePlans(newHomePlans);
  }, [compatibleHomePlans]);

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Compatible Home Plans</h2>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          padding: "2rem",
          justifyContent: "space-between",
        }}
      >
        {renderedHomePlans}
      </div>
    </div>
  );
};

export default CompatibleHomePlans;
