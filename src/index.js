import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import i18n from "./service/i18n";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./components/AppRouter";
import {Provider} from "react-redux";
import {createStore} from "redux";

const initialState = {
    calNo : null
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET' :
            return {calNo : action.value}
        case 'UNSET' :
            return {calNo : null}
        default :
            return state
    }
}

let store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18n={i18n}>
      <Provider store={store}>
          <AppRouter />
      </Provider>
  </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
