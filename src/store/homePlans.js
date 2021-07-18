import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../services/api";

export const fetchHomePlans = createAsyncThunk(
  "homePlans/fetchPlans",
  async () => {
    // In a more realistic scenario, this would be async and represent a response object
    // of some kind
    const response = API.getHomePlans();
    return response;
  }
);

export const selectAllHomePlans = (state) => {
  return state.homePlans.homePlans;
};

export const selectPlanById = (state, planId) => {
  return state.homePlans.homePlans.find((homePlan) => {
    // Query params get passed in as strings, rather than validate
    // at the component level we can safely and explicitly cast here for comparison
    return String(homePlan.homePlanId) === String(planId);
  });
};

export const selectHomePlansByIds = (state, homePlansIds) => {
  if (!homePlansIds) {
    return [];
  }
  // this could be faster, but again our api should handle this
  return state.homePlans.homePlans.filter((homePlan) => {
    return homePlansIds.includes(homePlan.homePlanId);
  });
};

export const homePlansSlice = createSlice({
  name: "homePlans",
  initialState: {
    homePlans: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchHomePlans.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchHomePlans.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.homePlans = action.payload;
    },
    [fetchHomePlans.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default homePlansSlice.reducer;
