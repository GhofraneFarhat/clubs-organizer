import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import {AuthContextProvider} from './shared/auth'
import {DataContextProvider} from'./shared/DataContext'

ReactDOM.render(
  <Suspense fallback={<Loader />}>
     
 
     <AuthContextProvider>
     <DataContextProvider>

      <App /></DataContextProvider>
      </AuthContextProvider>
  </Suspense>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
