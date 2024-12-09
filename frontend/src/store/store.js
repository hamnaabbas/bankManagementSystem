import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import businessReducer from "../features/businessSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    business: businessReducer,
  },
});

export default store;
