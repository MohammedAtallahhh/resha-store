import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import cart from "./slices/cartSlice";
import country from "./slices/countrySlice";

const reducers = combineReducers({ cart, country });

const config = {
  key: "root",
  storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
