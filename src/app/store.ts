import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import weatherSlice from "../weatherApp/actions-reducers/weatherReducers";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    weather: weatherSlice.reducer
    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
