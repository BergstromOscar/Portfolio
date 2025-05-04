import { setLanguage } from "./ShowTextComponent.js";

export class TabsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.initTabs();
  }

  initTabs() {
    const tabLinks = this.shadowRoot.querySelectorAll(".tab-links");
    const tabContents = this.shadowRoot.querySelectorAll(".tab-contents");

    tabLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const tabName = e.target.getAttribute("data-tab");

        tabLinks.forEach((l) => l.classList.remove("active-link"));
        tabContents.forEach((c) => c.classList.remove("active-tab"));

        e.target.classList.add("active-link");
        this.shadowRoot.getElementById(tabName).classList.add("active-tab");
      });
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import '/styles/style.css';
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
      </style>
      <div id="about">
      <div class="container">
        <div class="row">
          <div class="about-col-1 animate">
            <img
              src="https://oscarbergstrom.netlify.app/src/assets/profile.png"
              alt="Profile picture Oscar Bergstrom"
              loading="lazy"
            />
          </div>
          <div class="about-col-2">
            <h1 class="sub-title animate" data-i18n="about.title"></h1>
            <p class="sub-p animate" data-i18n="about.short_description"></p>
            <div class="tab-title animate">
              <h3 class="tab-links animate active-link" data-tab="skills" data-i18n="tabs.skills.title">
                Skills
              </h3>
              <h3 class="tab-links animate" data-tab="experience" data-i18n="tabs.experience.title">
                Experience
              </h3>
              <h3 class="tab-links animate" data-tab="education" data-i18n="tabs.education.title">
                Education
              </h3>
            </div>
            <div class="tab-contents active-tab" id="skills">
              <ul>
                <li class="tab-content-li animate">
                  <h4 data-i18n="tabs.skills.photographer"></h4>
                  <br />
                  <p data-i18n="tabs.skills.photographer_description"></p>
                </li>
                <li class="tab-content-li animate">
                  <h4 data-i18n="tabs.skills.designer"></h4>
                  <br />
                  <p data-i18n="tabs.skills.designer_description"></p>
                </li>
                <li class="tab-content-li animate">
                  <h4 data-i18n="tabs.skills.app_developer"></h4>
                  <br />
                  <p data-i18n="tabs.skills.app_developer_description"></p>
                </li>
                <li class="tab-content-li animate">
                  <h4 data-i18n="tabs.skills.video"></h4>
                  <br />
                  <p data-i18n="tabs.skills.video_description"></p>
                </li>
                <li class="tab-content-li animate">
                  <h4 data-i18n="tabs.skills.drone_pilot"></h4>
                  <br />
                  <p data-i18n="tabs.skills.drone_pilot_description"></p>
                </li>
                <li class="tab-content-li animate">
                  <h4 data-i18n="tabs.skills.SEO"></h4>
                  <br />
                  <p data-i18n="tabs.skills.SEO_description"></p>
                </li>
              </ul>
            </div>
            <div class="tab-contents" id="experience">
              <ul>
                <li class="tab-content-li animate">
                  <h4 data-i18n="tabs.experience.software_developer"></h4>
                  <br />
                  <p
                    data-i18n="tabs.experience.software_developer_description"
                  ></p>
                </li>
                <li class="tab-content-li animate">
                  <h4 data-i18n="tabs.experience.marketing_automation"></h4>
                  <br />
                  <p
                    data-i18n="tabs.experience.marketing_automation_description"
                  ></p>
                </li>
                <li class="tab-content-li animate">
                  <h4 data-i18n="tabs.experience.photographer"></h4>
                  <br />
                  <p data-i18n="tabs.experience.photographer_description"></p>
                </li>
              </ul>
            </div>
            <div class="tab-contents" id="education">
              <ul>
                <li class="tab-content-li animate">
                  <h4 data-i18n="tabs.education.linneuniversitetet"></h4>
                  <br />
                  <p
                    data-i18n="tabs.education.linneuniversitetet_description"
                  ></p>
                </li>
                <li class="tab-content-li animate">
                  <h4 data-i18n="tabs.education.medieinstitutet"></h4>
                  <br />
                  <p data-i18n="tabs.education.medieinstitutet_description"></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define("tabs-component", TabsComponent);
