import { setLanguage } from "./ShowTextComponent.js";

class CookieConsent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
      
        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: var(--clr-gradient-middle);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: sans-serif;
        }

        .modal {
          background: var(--clr-gradient);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 10px 30px var(--clr-gradient-middle);
          text-align: center;
        }

        .text {
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .accept {
          background-color: var(--clr-accept);
          color: white;
        }

        .accept:hover {
          background-color: var(--clr-accept-hoover);
        }

        .reject {
          background-color: var(--clr-reject);
          color: white;
        }

        .reject:hover {
          background-color: var(--clr-reject-hoover);
        }
      </style>

      <div class="modal">
        <div class="text" data-i18n="cookie.description"></div>
        <div class="buttons">
          <button class="accept" data-i18n="cookie.accept"></button>
          <button class="reject" data-i18n="cookie.reject"></button>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    const consent = this.getCookie("cookieConsent");
    if (consent !== "accepted") {
      // Visa popup och blockera scroll
      document.body.style.overflow = "hidden";
      this.style.display = "flex";

      this.shadowRoot
        .querySelector(".accept")
        .addEventListener("click", () => this.acceptCookies());
      this.shadowRoot
        .querySelector(".reject")
        .addEventListener("click", () => this.rejectCookies());
    } else {
      // Döljs om accepterat tidigare
      this.remove();
    }
  }

  acceptCookies() {
    this.setCookie("cookieConsent", "accepted", 365);
    document.body.style.overflow = ""; // Återställ scroll
    this.remove();
  }

  rejectCookies() {
    // Sparkas ut direkt – ingen cookie sparas
    window.location.href = "https://www.google.com"; // Ändra till t.ex. "no-access.html" om du vill
  }

  setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  getCookie(name) {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  }
}

customElements.define("cookie-consent", CookieConsent);
