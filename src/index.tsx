import React from "react";
import ReactDOM from "react-dom";

// Import App component
import App from "./components/app/App";

// Import styles
import "./css/index.css";

// Render App component in the DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
