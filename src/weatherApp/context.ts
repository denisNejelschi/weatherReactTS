import { createContext } from "react";
import { WeatherData } from "./WeatherApp";

export const WeatherContext = createContext<WeatherData[]>([]);


