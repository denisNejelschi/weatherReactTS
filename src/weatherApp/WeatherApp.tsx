import React, { useEffect, useState } from "react";
import style from "./weatherApp.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import WeatherHeader from "./header/WeatherHeader";
import { WeatherContext } from "./context";


const initialValues = {
  location: "",
};

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
      icon: string;
      id: number;
      main: string;
    }
  ];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  dt: number;
}

const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({} as WeatherData);
  const [favorite, setFavorite] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  
  const addToFavorites = () => {
    if (weather.name && !favorite.some((item) => item.name === weather.name)) {
      setFavorite([...favorite, weather]);
    } else {
      alert("Already added to favorites");
    }
  };
  const handleImageLoad = () => {
    setLoading(!loading);
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      location: Yup.string().trim().required("Required"),
    }),
    onSubmit: (values) => {
      async function getWeather(value: string) {
        try {
          const response = await fetch(`
            https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=42283fd1cd2294032a234a8e7a5213ca`);
          const data = await response.json();
          setWeather(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }

      getWeather(values.location);
      values.location = "";
    },
  });

  useEffect(() => {}, []);

  return (
    <div className={style.weatherAppContainer}>
      <WeatherContext.Provider value={favorite}>
        <WeatherHeader />
      </WeatherContext.Provider>

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
          <button  className={style.searchButton} type="submit" >
            Search
          </button>
        </div>
      </form>
     
     

      {weather.main && (
        <div className={style.outputContainer}>           
          <div className={style.outputText}>
            <p className={style.outputTemp}>
              {Math.round(weather.main.temp)} °C
            </p>
            <p className={style.outputLocation}>{weather.name}</p>
            <p className={style.outputCountry}>{weather.sys.country}</p>
          </div>
          
          <img  style={{width: "150px", height: "150px"}}
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt=""
          />
          <div className={style.buttonContainer}>
          <button
            className={style.deleteButton}
            onClick={() => setWeather({} as WeatherData)}
          >
            Delete
          </button>
          <button className={style.addButton} onClick={addToFavorites}>
           Save
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
