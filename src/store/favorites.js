import { createSlice } from "@reduxjs/toolkit";

export const isPlanFavorited = (state, homePlanId) => {
  return homePlanId in state.favorites.homePlans;
};

export const isLotFavorited = (state, lotId) => {
  return lotId in state.favorites.lots;
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    homePlans: {},
    lots: {},
  },
  reducers: {
    addFavoritePlan: (state, action) => {
      state.homePlans[action.payload] = true;
    },
    removeFavoritePlan: (state, action) => {
      delete state.homePlans[action.payload];
    },
    addFavoriteLot: (state, action) => {
      state.lots[action.payload] = true;
    },
    removeFavoriteLot: (state, action) => {
      delete state.lots[action.payload];
    },
  },
});

export const {
  addFavoriteLot,
  addFavoritePlan,
  removeFavoriteLot,
  removeFavoritePlan,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
