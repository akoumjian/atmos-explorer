import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHomePlans, selectAllHomePlans } from "../store/homePlans";
import { selectFavoritedPlans } from "../store/favorites";
import HomePlanCard from "./HomePlanCard";

const HomePlansPage = () => {
  const dispatch = useDispatch();
  const homePlans = useSelector(selectAllHomePlans);
  const homePlansStatus = useSelector((state) => state.homePlans.status);
  const homePlansError = useSelector((state) => state.homePlans.error);
  const favoritedPlans = useSelector(selectFavoritedPlans);
  const [renderedHomePlans, setRenderedHomePlans] = useState(
    <div>Loading...</div>
  );
  const [savedOnly, setSavedOnly] = useState(false);

  useEffect(() => {
    // Load initial data
    if (homePlansStatus === "idle") {
      dispatch(fetchHomePlans());
    }
  }, [homePlansStatus, dispatch]);

  useEffect(() => {
    let content = "";
    if (homePlansStatus === "idle") {
      content = <div>Loading...</div>;
    } else if (homePlansStatus === "failed") {
      content = <div>{homePlansError}</div>;
    } else if (homePlansStatus === "succeeded") {
      content = homePlans.map((plan) => {
        if (savedOnly && !(plan.homePlanId in favoritedPlans)) {
          return;
        }
        return (
          <HomePlanCard key={plan.homePlanId} homePlan={plan}></HomePlanCard>
        );
      });
    }
    setRenderedHomePlans(content);
  }, [homePlansStatus, homePlans, homePlansError, savedOnly, favoritedPlans]);
  return (
    <div>
      <button
        onClick={() => {
          setSavedOnly(!savedOnly);
        }}
      >
        Show Saved Homes
      </button>
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

export default HomePlansPage;
