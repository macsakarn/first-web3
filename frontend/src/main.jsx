import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BankProvider } from "./context/BankContaxt";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BankProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BankProvider>
);
