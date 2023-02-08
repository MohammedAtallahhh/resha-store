import { createSlice } from "@reduxjs/toolkit";

const countrySlice = createSlice({
  name: "country",
  initialState: {},
  reducers: {
    set(state, action) {
      return action.payload;
    },
  },
});

export const { set } = countrySlice.actions;
export default countrySlice.reducer;
