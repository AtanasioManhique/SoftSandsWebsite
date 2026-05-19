import { useState, createContext, useContext } from "react";
export const LanguageContext = createContext();
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("pt");
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}
export function useLang() { return useContext(LanguageContext); }