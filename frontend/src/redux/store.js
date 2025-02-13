import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../redux/gameSlice";

const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export default store;
