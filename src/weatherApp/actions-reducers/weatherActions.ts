import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WeatherData } from "./../types"; 

export  const getWeatherData = createAsyncThunk<WeatherData, string, { rejectValue: string }>(
  "weather/getWeatherData",
  async (location: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=42283fd1cd2294032a234a8e7a5213ca`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export default  getWeatherData;