// src/components/SaveLanguageInCookiesComponent.js
import { setLanguage } from "./ShowTextComponent.js";

export function initLanguage() {
  const savedLang = localStorage.getItem("preferredLanguage");
  const userLang = navigator.language || navigator.userLanguage;

  if (savedLang) {
    setLanguage(savedLang);
  } else if (userLang.startsWith("sv")) {
    setLanguage("sv");
  } else {
    setLanguage("en");
  }
}

export function saveLanguage(lang) {
  localStorage.setItem("preferredLanguage", lang);
  setLanguage(lang);
}