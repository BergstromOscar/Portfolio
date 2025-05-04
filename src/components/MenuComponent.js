// src/components/MenuComponent.js
import { saveLanguage } from "./SaveLanguageInCookiesComponent.js";
import { setLanguage } from "./ShowTextComponent.js";

export class MenuComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
            <style>
                @import '/styles/style.css';
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

                #menu-close {
                  display: none;
                  z-index: 999;
                
                }
            </style>
            <nav>
                <a href="/"><img src="https://oscarbergstrom.netlify.app/public/images/logo.png" class="logo" alt="Oscar Bergström logo"></a>
                <ul id="sidemenu">
                    <li><a href="/src/pages/about/about.html" data-i18n="nav.about">About Me</a></li>
                    <li><a href="/src/pages/services/services.html" data-i18n="nav.services">Services</a></li>
                    <li><a href="/src/pages/portfolio/portfolio.html" data-i18n="nav.portfolio">Portfolio</a></li>
                    <li><a href="/src/pages/contact/contact.html" data-i18n="nav.contact">Contact</a></li>
                    <li>
                      <div class="language-dropdown">
                        <i class="fa-solid fa-earth-europe" id="toggle-language" style="cursor: pointer;"></i>
                        <div id="language-menu" class="dropdown-content" style="display: none;">
                          <button data-i18n="nav.language.swe" id="lang-sv"></button>
                          <button data-i18n="nav.language.eng" id="lang-en"></button>
                        </div>
                      </div>
                    </li> 
                </ul>
                <i class="fas fa-bars" id="menu-open"></i>
                <i class="fas fa-times" id="menu-close"></i>
            </nav>
        `;

    this.menu = this.shadowRoot.querySelector("#sidemenu");
    this.openIcon = this.shadowRoot.querySelector("#menu-open");
    this.closeIcon = this.shadowRoot.querySelector("#menu-close");

    this.toggleBtn = this.shadowRoot.querySelector("#toggle-language");
    this.langMenu = this.shadowRoot.querySelector("#language-menu");
    this.langSvBtn = this.shadowRoot.querySelector("#lang-sv");
    this.langEnBtn = this.shadowRoot.querySelector("#lang-en");

    this.addEventListeners();
  }

  addEventListeners() {
    this.openIcon.addEventListener("click", () => this.openMenu());
    this.closeIcon.addEventListener("click", () => this.closeMenu());

    this.toggleBtn.addEventListener("click", () => this.toggleLanguageMenu());
    this.langSvBtn.addEventListener("click", () => {
      saveLanguage("sv");
      this.langMenu.style.display = "none";
    });

    this.langEnBtn.addEventListener("click", () => {
      saveLanguage("en");
      this.langMenu.style.display = "none";
    });
  }

  openMenu() {
    this.menu.style.right = "0px";
    if (window.innerWidth < 850) {
      this.openIcon.style.display = "none";
      this.closeIcon.style.display = "block";
    }
  }

  closeMenu() {
    this.menu.style.right = "-200px";
    if (window.innerWidth < 850) {
      this.openIcon.style.display = "block";
      this.closeIcon.style.display = "none";
    }
  }

  toggleLanguageMenu() {
    this.langMenu.style.display =
      this.langMenu.style.display === "block" ? "none" : "block";
  }
}

customElements.define("menu-component", MenuComponent);
