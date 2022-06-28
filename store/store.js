import { configureStore } from "@reduxjs/toolkit";
import MailSlice from "./mail-slice";

const store = configureStore({
  reducer: {
    mailForm: MailSlice.reducer,
  },
});

export const { openMailForm, closeMailForm } = MailSlice.actions;

export default store;
