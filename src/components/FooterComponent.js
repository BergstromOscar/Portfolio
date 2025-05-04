import { setLanguage } from "./ShowTextComponent.js";
class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    setLanguage("sv");
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import '/styles/style.css';
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
      </style>
    <footer>
      <div class="copyright">
        <p data-i18n="footer.copyright"></p>
      </div>
    </footer>
    `;
  }
}

customElements.define("footer-component", FooterComponent);
