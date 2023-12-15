import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import signInSlice from "../pages/SignIn/signInSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    signIn: signInSlice,
  },
});
