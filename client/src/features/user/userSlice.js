import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  userName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { id, firstName, lastName, userName } = action.payload;
      state.id = id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.userName = userName;
    },
    setUserName(state, action) {
      state.userName = action.payload;
    }
  },
});

const { actions, reducer } = userSlice;
export const { setUser, setUserName } = actions;
export default reducer;
