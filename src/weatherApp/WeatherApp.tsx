import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addToFavorites,
  resetError,
  resetWeather,
  deleteFromFavorites,
} from "./actions-reducers/weatherReducers";
import WeatherHeader from "./header/WeatherHeader";
import style from "./weatherApp.module.css";
import getWeatherData from "./actions-reducers/weatherActions";
import Spinner from "./Spinner/Spinner";
import { logoutUser } from "../features/auth/authSlice";

import Auth from "../auth/Auth";  // Make sure Auth component is implemented
import { getUserWithToken } from "../features/auth/authActons";

const initialValues = {
  location: "",
};

const schema = Yup.object().shape({
  location: Yup.string()
    .trim()
    .required("Required")
    .min(1, "Too Short!")
    .max(15, "Too Long!"),
});

const WeatherApp = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);  // Update to use 'auth'
  const favorites = useAppSelector((state) => state.weather.favorites);
  const { weather, isLoading, error } = useAppSelector(
    (store) => store.weather
  );

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(getWeatherData(values.location));
      dispatch(resetError());
      formik.resetForm();
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('shop-token');
    if (token && !user.token) {
      dispatch(getUserWithToken(token));
    }
  }, [user.token, dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(resetError()), 3000);
    }
  }, [error, dispatch]);

  return (
    <div className={style.weatherAppContainer}>
      <WeatherHeader />
      {!user.token && <Auth />}  
      {user.token && (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className={style.formContainer}>
              <input
                placeholder="Enter Location"
                id="location"
                name="location"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.location}
              />
              <button className={style.searchButton} type="submit">
                Search
              </button>
            </div>
          </form>
          {isLoading && <Spinner />}
          {error && (
            <div className={style.outputError}>
              {"Location not found, please try again"}
            </div>
          )}
          {weather.name !== "" && (
            <div className={style.outputContainer}>
              <div className={style.outputText}>
                <p className={style.outputTemp}>
                  {Math.round(weather.main.temp)} °C
                </p>
                <p className={style.outputLocation}>{weather.name}</p>
                <p className={style.outputCountry}>{weather.sys.country}</p>
              </div>
              <img
                
                src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt=""
              />
              <div className={style.buttonContainer}>
                <button
                  className={style.deleteButton}
                  onClick={() => dispatch(resetWeather())}
                >
                  Delete
                </button>
                <button
                  className={style.addButton}
                  onClick={() => dispatch(addToFavorites())}
                >
                  Save
                </button>
              </div>
            </div>
          )}
          {favorites.length > 0 && (
            <div>
              <h3>Favorites</h3>
              <div className={style.favoritesContainer}>
                {favorites.map((fav, index) => (
                  <div key={index} className={style.favoriteItem}>
                    <p>{fav.name}</p>
                    <p>{Math.round(fav.main.temp)} °C</p>
                    <p>{fav.sys.country}</p>
                    <button onClick={() => dispatch(deleteFromFavorites(fav.name))}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}          
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
