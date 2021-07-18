import { configureStore } from "@reduxjs/toolkit";
import homePlansReducer from "./homePlans";
import lotsReducer from "./lots";
import combinationsReducer from "./combinations";
import favoritesReducer from "./favorites";

export default configureStore({
  reducer: {
    homePlans: homePlansReducer,
    lots: lotsReducer,
    combinations: combinationsReducer,
    favorites: favoritesReducer,
  },
});
