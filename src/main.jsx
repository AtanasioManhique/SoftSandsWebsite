import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./language/useLanguage";
import "./index.css";
import App from "./App";
import logoUrl from "./data/LogoSoftSands.png";

const link = document.querySelector("link[rel='icon']") || document.createElement("link");
link.rel = "icon";
link.type = "image/png";
link.href = logoUrl;
document.head.appendChild(link);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);