import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

// Initialize Tempo Devtools
import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

// Clean up any duplicate root elements that might exist
const cleanupDOM = () => {
  const rootElements = document.querySelectorAll("#root");
  if (rootElements.length > 1) {
    for (let i = 1; i < rootElements.length; i++) {
      rootElements[i].remove();
    }
  }
};

cleanupDOM();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>,
);
