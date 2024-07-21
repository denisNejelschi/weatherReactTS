import { createSlice } from "@reduxjs/toolkit";

import { IUserData } from "../../auth/Auth";
import { loginUser, getUserWithToken } from "./authActons";

interface IUserState {
  user: IUserData;
  isLoading: boolean;
  error: string;
}

const initialUser: IUserData = {
  id: 0,
  gender: "",
  email: "emilyspass",//для того чтоб не запоминать пароль
  firstName: "emilys",
  lastName: "",
  refreshToken: "",
  token: "",
  image: "",
};

const initialState: IUserState = {
  user: initialUser,
  isLoading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = initialUser;
      localStorage.removeItem('shop-token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = initialUser;
        state.error = action.payload as string;
      })
      .addCase(getUserWithToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      });
  },
});

export default authSlice;
export const { logoutUser } = authSlice.actions;
