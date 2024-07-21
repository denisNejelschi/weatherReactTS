
export interface WeatherData {
    status: string;
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
  

  export interface IWeatherState {
    weather: WeatherData;
    isLoading: boolean;
    error: string;
    favorites: WeatherData[];
    status?: "fulfilled" | "rejected" | "pending";
  }
  
   export const initialWeather: WeatherData = {
     name: "",
     main: {
       temp: NaN,
       feels_like: NaN,
       humidity: NaN,
     },
     weather: [
       {
         description: "",
         icon: "",
         id: 0,
         main: "",
       }
     ],
     wind: {
       speed: NaN,
     },
     sys: {
       country: "",
     },
     dt: NaN,
     status: ""
   };
  
  export const initialState: IWeatherState = {
    weather: initialWeather,
    isLoading: false,
    error: "",
    favorites: [],
  };
  