import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getWeatherData } from "./weatherActions";
import {
  IWeatherState,
  WeatherData,
  initialState,
  initialWeather,
} from "./../types";

const weatherSlice = createSlice({
  name: "sliceWeather",
  initialState,
  reducers: {
    addToFavorites: (state) => {
      const maxFavorites = 6;
      const existingFavorite = state.favorites.find(
        (favorite) => favorite.name === state.weather.name
      );
      if (!existingFavorite) {
        if (state.favorites.length >= maxFavorites) {
          state.favorites.shift();
        }
        state.favorites.push(state.weather);
        state.error = "";
      } else {
        state.error = `${state.weather.name} is already in favorites.`;
      }
    },
    deleteFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.name !== action.payload
      );
    },
    resetWeather: () => initialState,
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getWeatherData.fulfilled,
        (state, action: PayloadAction<WeatherData>) => {
          state.isLoading = false;
          state.weather = action.payload;
          state.status = "fulfilled";
        }
      )
      .addCase(
        getWeatherData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.weather = initialWeather;
          state.error = action.payload || "Failed to fetch weather data";
        }
      );
  },
});

export const { addToFavorites, resetWeather, resetError, deleteFromFavorites } =
  weatherSlice.actions;
export default weatherSlice;
