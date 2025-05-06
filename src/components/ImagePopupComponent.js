class ImagePopupComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        @import '/styles/style.css';
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
        .fa-x{
          font-size: 1rem;
          color: white;
          cursor: pointer;}
      </style>
      <div id="image-popup" class="popup">
        <span class="close"><i class="fa-solid fa-x"></i></span>
        <img class="popup-content" id="popup-img" alt="Fullscreen image" loading="lazy" />
        <h2 id="popup-title" class="popup-title"></h2>
        <p id="popup-caption" class="popup-caption"></p>
        <div class="popup-nav">
          <span id="prev" class="nav-arrow"><i class="fa-solid fa-arrow-left"></i></span>
          <span id="next" class="nav-arrow"><i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.popup = this.shadowRoot.getElementById("image-popup");
    this.popupImg = this.shadowRoot.getElementById("popup-img");
    this.titleEl = this.shadowRoot.getElementById("popup-title");
    this.captionEl = this.shadowRoot.getElementById("popup-caption");
    this.closeBtn = this.shadowRoot.querySelector(".close");
    this.nextBtn = this.shadowRoot.getElementById("next");
    this.prevBtn = this.shadowRoot.getElementById("prev");

    this.images = [];
    this.currentIndex = 0;

    document.addEventListener("image-clicked", (e) => {
      this.currentIndex = e.detail.index;
      this.showImage(this.currentIndex);
    });

    this.closeBtn.addEventListener("click", () => this.closePopup());
    this.popup.addEventListener("click", (e) => {
      if (e.target === this.popup) this.closePopup();
    });
    this.nextBtn.addEventListener("click", () =>
      this.showImage(this.currentIndex + 1)
    );
    this.prevBtn.addEventListener("click", () =>
      this.showImage(this.currentIndex - 1)
    );
    document.addEventListener("keydown", this.keyboardNav.bind(this));

    this.fetchImages();
  }

  async fetchImages() {
    const res = await fetch("/src/assets/img-data.JSON");
    this.images = await res.json();
  }

  showImage(index) {
    if (!this.images.length) return;

    if (index < 0) index = this.images.length - 1;
    if (index >= this.images.length) index = 0;

    const img = this.images[index];
    this.popupImg.src = `https://oscarbergstrom.netlify.app/src/assets/sizeOriginal${img.path}`;
    this.popupImg.alt = img.alt;
    this.titleEl.textContent = img.name || "";
    this.captionEl.textContent = img.caption || "";
    this.popup.style.display = "block";
    this.currentIndex = index;

    this.preloadImage((index + 1) % this.images.length);
    this.preloadImage((index - 1 + this.images.length) % this.images.length);
  }
  preloadImage(index) {
    const img = new Image();
    const target = this.images[index];
    if (target) {
      img.src = `https://oscarbergstrom.netlify.app/src/assets/sizeOriginal${target.path}`;
    }
  }

  closePopup() {
    this.popup.style.display = "none";
  }

  keyboardNav(e) {
    if (this.popup.style.display === "block") {
      if (e.key === "ArrowRight") this.showImage(this.currentIndex + 1);
      if (e.key === "ArrowLeft") this.showImage(this.currentIndex - 1);
      if (e.key === "Escape") this.closePopup();
    }
  }
}

customElements.define("image-popup-component", ImagePopupComponent);
