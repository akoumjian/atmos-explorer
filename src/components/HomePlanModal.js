import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchHomePlans, selectPlanById } from "../store/homePlans";
import CompatibleLots from "./CompatibleLots";
import HomeFavorite from "./HomeFavorite";

// from https://reactrouter.com/web/example/query-parameters
// Create a hook to react to the query param part of the url
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const HomePlanModal = () => {
  let query = useQuery();
  const dispatch = useDispatch();

  // Our universal modal has to pull in a lot of data because our API is not designed
  // flexibly enough. The simpler solution would of course be to add a /homePlan/:id
  // endpoint to our API. I opted not to add it in order to demonstrate
  const homePlansStatus = useSelector((state) => state.homePlans.status);
  const homePlan = useSelector((state) =>
    selectPlanById(state, query.get("selectedHomePlan"))
  );
  const [content, setContent] = useState(<div>Loading...</div>);

  useEffect(() => {
    // Load initial data
    if (homePlansStatus === "idle") {
      dispatch(fetchHomePlans());
    }
  }, [homePlansStatus, dispatch]);

  useEffect(() => {
    if (homePlan) {
      setContent(
        <div
          style={{
            maxWidth: "80vw",
            maxHeight: "80vh",
            backgroundColor: "rgb(255, 255, 255)",
            borderRadius: "1rem",
            overflow: "scroll",
          }}
        >
          {/* Note:
              Even though this area currently resembles very closely
              the contents of the HomePlanCard component, I am opting not
              to reuse that component here. In my experience, adjusting layout
              conditionally within a component, based on context, tends to create more
              problems than the DRY usage saves. Additionally, this kind of reuse scenario
              tends to diverge over time as the context specific rendering tends to get
              more and more complex.
          */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              position: "relative",
            }}
          >
            <img
              style={{ width: "50%" }}
              src={homePlan.image}
              alt={homePlan.name}
            />
            <div style={{ padding: "1rem" }}>
              <h3>{homePlan.name}</h3>
              <div>
                <span>{homePlan.numBeds} beds</span>-
                <span>{homePlan.numBaths}</span>-<span>{homePlan.sqft}</span>
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
            <div style={{ position: "absolute", top: "5px", right: "5px" }}>
              <HomeFavorite homePlanId={homePlan.homePlanId}></HomeFavorite>
            </div>
          </div>
          <CompatibleLots homePlanId={homePlan.homePlanId}></CompatibleLots>
        </div>
      );
    }
  }, [homePlan]);
  if (!query.get("selectedHomePlan")) {
    return null;
  }

  return <Modal>{content}</Modal>;
};

export default HomePlanModal;
