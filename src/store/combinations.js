import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../services/api";

export const fetchCombinations = createAsyncThunk(
  "combinations/fetchCombinations",
  async () => {
    // In a more realistic scenario, this would be async and represent a response object
    // of some kind
    const response = API.getCombinations();
    return response;
  }
);

export const selectComboByHomePlan = (state, homePlanId) => {
  return state.combinations.byHomePlan[homePlanId];
};

export const selectComboByLot = (state, lotId) => {
  return state.combinations.byLot[lotId];
};

export const combinationSlice = createSlice({
  name: "combinations",
  initialState: {
    byHomePlan: {},
    byLot: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchCombinations.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCombinations.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Here we are pre-mapping our valid combinations of plans/lots
      // to make it easier to look up later. A better design would be to
      // have the API layer be able to fetch by houseplan or lot and then
      // cache after first retrieval
      for (const combo of action.payload) {
        state.byHomePlan[combo.homePlanId] =
          state.byHomePlan[combo.homePlanId] || [];
        state.byHomePlan[combo.homePlanId].push(combo.lotId);
        state.byLot[combo.lotId] = state.byLot[combo.lotId] || [];
        state.byLot[combo.lotId].push(combo.homePlanId);
      }
    },
    [fetchCombinations.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default combinationSlice.reducer;
