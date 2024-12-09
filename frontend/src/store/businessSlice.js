import { createSlice } from "@reduxjs/toolkit";

const businessSlice = createSlice({
  name: "business",
  initialState: {
    accounts: [],
    notifications: [],
  },
  reducers: {
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { setAccounts, setNotifications } = businessSlice.actions;
export default businessSlice.reducer;
