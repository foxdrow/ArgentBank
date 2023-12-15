import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    auth: false,
    remember: false,
    error: null,
};

const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
      signInPending: (state) => {
        state.loading = true;
      },
      signInSuccess: (state, action) => {
        state.loading = false;
        state.auth = true;
        state.error = null;
      },
      signInFailure: (state, action) => {
        state.loading = false;
        state.auth = false;
        state.error = action.payload;
      },
      signInRemember: (state, action) => {
        state.remember = action.payload;
      },
      signInOut: (state) => {
        state.auth = false;
      }, 
    },
});

export const actions = signInSlice.actions;
export const { signInPending, signInSuccess, signInFailure, signInRemember, signInOut } = signInSlice.actions;
export default signInSlice.reducer;