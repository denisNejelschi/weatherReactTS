import React, { useState } from "react";
import style from "./weatherHeader.module.css";
import { WeatherData } from "../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import authSlice, { logoutUser } from "../../features/auth/authSlice";

const WeatherHeader= () => {
  const favorites = useAppSelector((state) => state.weather.favorites);
  const[show, setShow] = useState(false)
  const dispatch = useAppDispatch();
  function buttonText(){
if(!show){
  return "Favorites";
}else{
  return "Hide";
}
  }
  const showFavoritesToggle = () => {
    if(favorites.length > 0){
      setShow(!show);
    }else{
      window.alert("No favorites to show");
    } 
  }  
  
  return (
    <header className={style.header}>
      <h1>Weather App</h1>
      <button className={style.logoutButton} onClick={() => dispatch(logoutUser())}>Logout</button>
      <button  className={`${style.show} ${show ? style.active : ""}`} onClick={() => showFavoritesToggle()}>{buttonText()}</button>
      {show && <div className={style.favoritesContainer}>
        {favorites.map((favorite: WeatherData, index: number) => (
          <div key={index} className={style.favoriteItem}>
            <p>{favorite.name}</p>
            <p>{Math.round(favorite.main.temp)} °C</p>
          </div>
        ))}
      </div>}
    </header>
  );
};

export default WeatherHeader;
