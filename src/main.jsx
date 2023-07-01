import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import store from "./store/store";
import { addProfileData, setLoggedIn } from "./store/actions/ProfileActions.js";

const profileData = JSON.parse(localStorage.getItem("profile"));

if (profileData !== null && profileData.data !== null) {
  store.dispatch(addProfileData(profileData.data));
  store.dispatch(setLoggedIn(true));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
