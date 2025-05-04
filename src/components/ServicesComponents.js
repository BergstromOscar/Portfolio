import { setLanguage } from "./ShowTextComponent.js";

export class ServicesComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/styles/style.css" />
      <div id="services">
        <div class="container">
          <h1 class="sub-title animate" data-i18n="services.title"></h1>
          <div class="services-list">
            <div class="services-list-item animate">
              <i class="fa-solid fa-chart-simple"></i>
              <h2 data-i18n="services.marketing.title"></h2>
              <p data-i18n="services.marketing.description"></p>
              <a href="https://oscarbergstrom.netlify.app/src/pages/services/marketing/marketing.html" data-i18n="services.learn_more"></a>
            </div>
            <div class="services-list-item animate">
              <i class="fa-solid fa-code"></i>
              <h2 data-i18n="services.webdesign.title"></h2>
              <p data-i18n="services.webdesign.description"></p>
              <a href="https://oscarbergstrom.netlify.app/src/pages/services/marketing/programmer.html" data-i18n="services.learn_more"></a>
            </div>
            <div class="services-list-item animate">
              <i class="fa-solid fa-camera"></i>
              <h2 data-i18n="services.photography.title"></h2>
              <p data-i18n="services.photography.description"></p>
              <a href="https://oscarbergstrom.netlify.app/src/pages/services/marketing/photographer.html" data-i18n="services.learn_more"></a>
            </div>
          </div>
        </div>
      </div>
    `;

    setLanguage?.(this.shadowRoot);
  }
}

customElements.define("services-component", ServicesComponent);
