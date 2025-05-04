import { setLanguage } from "./ShowTextComponent.js";

class ContactForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    this.addEventListener("submit", this.handleSubmit.bind(this));
    setLanguage("sv"); // Byt till den aktuella språkkoden, t.ex. "sv" eller "en"
  }

  disconnectedCallback() {
    this.removeEventListener("submit", this.handleSubmit);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
                @import '/styles/style.css';
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

      </style>
     <div id="contact">
      <div class="container">
        <div class="row">
          <div class="contact-left">
            <h1 class="sub-title" data-i18n="contact.title"></h1>
            <p>
              <i class="fas fa-paper-plane"></i
              ><span data-i18n="contact.email"></span>
            </p>
            <p>
              <i class="fas fa-phone-square-alt"></i
              ><span data-i18n="contact.phone"></span>
            </p>
            <div class="social-icons">
              <a href="https://www.facebook.com/OscarBergstrom96/"
                ><i class="fab fa-facebook"></i
              ></a>
              <a
                href="https://www.linkedin.com/in/oscar-bergstr%C3%B6m-940297180/"
                ><i class="fab fa-linkedin"></i
              ></a>
              <a href="https://www.instagram.com/racsomortsgreb/"
                ><i class="fab fa-instagram"></i
              ></a>
              <a href="https://github.com/BergstromOscar/"
                ><i class="fab fa-github"></i
              ></a>
            </div>
            <a
              href="/public/downloads/CV.pdf"
              download
              class="btn btn2"
              data-i18n="contact.download_cv"
            >
              <i class="fa-solid fa-download"></i
            ></a>
            <a
              href="/public/downloads/Personligt brev.pdf"
              download
              class="btn btn2"
              data-i18n="contact.download_cover_letter"
            >
              <i class="fa-solid fa-download"></i
            ></a>
          </div>
          <div class="contact-right">
            <form name="contact-form" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact-form" />
              <input
                type="text"
                name="Name"
                data-i18n="contact_form.name_placeholder"
                placeholder="Your name"
                required
              />
              <input
                type="email"
                name="Email"
                data-i18n="contact_form.email_placeholder"
                placeholder="Your email"
                required
              />
              <textarea
                name="Message"
                rows="6"
                data-i18n="contact_form.message_placeholder"
                placeholder="Your message"
              ></textarea>
              <button
                type="submit"
                class="btn btn2"
                data-i18n="contact_form.submit_button"
              >
                Submit
              </button>
            </form>
            <span id="msg"></span>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const form = this.shadowRoot.querySelector("form");
    const statusDiv = this.shadowRoot.querySelector(".status");

    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        statusDiv.textContent = this.getTranslation("contact.success");
        statusDiv.className = "success";
        form.reset();
      } else {
        throw new Error();
      }
    } catch (err) {
      statusDiv.textContent = this.getTranslation("contact.error");
      statusDiv.className = "error";
    }
  }

  getTranslation(key) {
    const lang = "sv";
    const keys = key.split(".");
    let text = translations[lang];

    keys.forEach((key) => {
      if (text) {
        text = text[key];
      }
    });

    return text || key;
  }
}

customElements.define("contact-form-component", ContactForm);
