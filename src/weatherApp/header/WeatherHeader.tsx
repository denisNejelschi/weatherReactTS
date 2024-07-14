import React, { useContext, useState } from "react";
import style from "./weatherHeader.module.css";
import { WeatherContext } from "../context";
import { WeatherData } from "../WeatherApp"; 

const WeatherHeader: React.FC = () => {
  const favorites = useContext(WeatherContext);

  

  return (
    <header className={style.header}>
      <h1>Weather App </h1>
      <div className={style.favoritesContainer}>
        {favorites.map((favorite: WeatherData, index: number) => (
          <div key={index} className={style.favoriteItem}>
            <p>{favorite.name}</p>
            <p>{Math.round(favorite.main.temp)} °C</p>
                    
           
            
          </div>
        ))}
      </div>
    </header>
  );
};

export default WeatherHeader;
