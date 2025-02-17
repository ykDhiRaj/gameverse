import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../redux/gameSlice";
import userReducer from "../redux/userSlice"
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key:'root',
  storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer);


const store = configureStore({
  reducer: {
    games: gamesReducer,
    user:persistedUserReducer
  },
});

export const persistor = persistStore(store);

export default store;
