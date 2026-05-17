import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Mcpui } from "@mcpui/react";
import "./index.css";
import App from "./App.jsx";

const root = document.getElementById("mr0") ?? document.getElementById("root");
createRoot(root).render(
  <StrictMode>
    <Mcpui.Provider>
      <App />
    </Mcpui.Provider>
  </StrictMode>
);
