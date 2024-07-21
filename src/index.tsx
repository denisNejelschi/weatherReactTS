import ReactDOM from "react-dom/client";
import "./index.css";
import { Form, HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import WeatherApp from "./weatherApp/WeatherApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<WeatherApp />}></Route>
      </Routes>
    </HashRouter>
  </Provider>
);
