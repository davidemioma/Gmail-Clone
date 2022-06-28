import { createSlice } from "@reduxjs/toolkit";

const MailSlice = createSlice({
  name: "mail",
  initialState: {
    isMailFormOpen: false,
  },
  reducers: {
    openMailForm(state) {
      state.isMailFormOpen = true;
    },

    closeMailForm(state) {
      state.isMailFormOpen = false;
    },
  },
});

export default MailSlice;
