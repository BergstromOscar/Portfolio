import translations from "../locales/translations.js";

export function setLanguage(lang) {
  const updateElements = (root) => {
    const elements = root.querySelectorAll("[data-i18n]");

    elements.forEach((el) => {
      const keys = el.getAttribute("data-i18n").split(".");
      let text = translations[lang];

      keys.forEach((key) => {
        if (text) {
          text = text[key];
        }
      });

      if (text) {
        if (el.hasAttribute("placeholder")) {
          el.setAttribute("placeholder", text);
        } else {
          el.innerHTML = text;
        }
      }
    });
  };

  updateElements(document);

  document.querySelectorAll("*").forEach((el) => {
    if (el.shadowRoot) {
      updateElements(el.shadowRoot);
    }
  });

  const menu = document.getElementById("language-menu");
  if (menu) {
    menu.style.display = "none";
  }
}
