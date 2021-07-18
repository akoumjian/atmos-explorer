import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../services/api";

export const fetchLots = createAsyncThunk("lots/fetchLots", async () => {
  // In a more realistic scenario, this would be async and represent a response object
  // of some kind
  const response = API.getLots();
  return response;
});

export const selectAllLots = (state) => {
  return state.lots.lots;
};

export const selectLotById = (state, lotId) => {
  return state.lots.lots.find((lot) => {
    // Query params get passed in as strings, rather than validate
    // at the component level we can safely and explicitly cast here for comparison
    return String(lot.lotId) === String(lotId);
  });
};

export const selectLotsByIds = (state, lotIds) => {
  if (!lotIds) {
    return [];
  }
  // this could be faster, but again our api should handle this
  return state.lots.lots.filter((lot) => {
    return lotIds.includes(lot.lotId);
  });
};

export const lotsSlice = createSlice({
  name: "lots",
  initialState: {
    lots: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchLots.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchLots.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.lots = action.payload;
    },
    [fetchLots.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default lotsSlice.reducer;
