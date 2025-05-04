class ImagePopupComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        @import '/styles/style.css';
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

      </style>
        <div id="image-popup" class="popup">
          <span class="close">&times;</span>
          <img
            class="popup-content"
            id="popup-img"
            alt="Fullscreen image"
            loading="lazy"
          />
          <div class="popup-nav">
            <span id="prev" class="nav-arrow"
              ><i class="fa-solid fa-arrow-left"></i
            ></span>
            <span id="next" class="nav-arrow"
              ><i class="fa-solid fa-arrow-right"></i
            ></span>
          </div>
        </div>
    `;
  }

  connectedCallback() {
    this.popup = this.shadowRoot.getElementById("image-popup");
    this.popupImg = this.shadowRoot.getElementById("popup-img");
    this.closeBtn = this.shadowRoot.querySelector(".close");
    this.nextBtn = this.shadowRoot.getElementById("next");
    this.prevBtn = this.shadowRoot.getElementById("prev");

    this.currentIndex = 0;

    document.addEventListener("click", this.openPopup.bind(this));
    this.closeBtn.addEventListener(
      "click",
      () => (this.popup.style.display = "none")
    );
    this.popup.addEventListener("click", (e) => {
      if (e.target === this.popup) this.popup.style.display = "none";
    });
    this.nextBtn.addEventListener("click", () =>
      this.showImage(this.currentIndex + 1)
    );
    this.prevBtn.addEventListener("click", () =>
      this.showImage(this.currentIndex - 1)
    );
    document.addEventListener("keydown", this.keyboardNav.bind(this));
  }

  getAllImages() {
    return Array.from(document.querySelectorAll("#work-list img"));
  }

  openPopup(e) {
    const layer = e.target.closest(".work");
    if (!layer) return;

    const allImages = this.getAllImages();
    const img = layer.querySelector("img");
    this.currentIndex = allImages.findIndex((el) => el.src === img.src);
    this.showImage(this.currentIndex);
  }

  showImage(index) {
    const allImages = this.getAllImages();
    if (index < 0) index = allImages.length - 1;
    if (index >= allImages.length) index = 0;

    const img = allImages[index];
    const originalName = img.getAttribute("data-name");

    this.popupImg.src = `https://oscarbergstrom.netlify.app/src/assets/sizeOriginal/${originalName}`;
    this.popupImg.alt = img.alt;
    this.popup.style.display = "block";

    this.currentIndex = index;
  }

  keyboardNav(e) {
    if (this.popup.style.display === "block") {
      if (e.key === "ArrowRight") this.showImage(this.currentIndex + 1);
      if (e.key === "ArrowLeft") this.showImage(this.currentIndex - 1);
      if (e.key === "Escape") this.popup.style.display = "none";
    }
  }
}

customElements.define("image-popup-component", ImagePopupComponent);
