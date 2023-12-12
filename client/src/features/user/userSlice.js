import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { id, firstName, lastName } = action.payload;
      state.id = id;
      state.firstName = firstName;
      state.lastName = lastName;
    },
  },
});

const { actions, reducer } = userSlice;
export const { setUser } = actions;
export default reducer;
