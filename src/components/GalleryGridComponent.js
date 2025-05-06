class GalleryGridComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.allImages = [];
    this.filteredImages = [];
  }

  async connectedCallback() {
    const jsonPath = "/src/assets/img-data.JSON";
    const response = await fetch(jsonPath);
    const images = await response.json();
    this.allImages = images;
    this.filteredImages = images;
    this.render();

    // Lyssna på sökförfrågan
    window.addEventListener("search-change", (e) => {
      this.filterImages(e.detail);
    });

    window.addEventListener("filter-change", (e) => {
      this.filterByTags(e.detail);
    });
  }

  filterImages(query) {
    const q = query.toLowerCase();
    this.filteredImages = this.allImages.filter((img) => {
      return (
        img.name?.toLowerCase().includes(q) ||
        img.caption?.toLowerCase().includes(q) ||
        img.alt?.toLowerCase().includes(q) ||
        (img.tags || []).some((tag) => tag.toLowerCase().includes(q))
      );
    });
    this.render();
  }

  filterByTags(tags) {
    if (!tags.length) {
      this.filteredImages = this.allImages;
    } else {
      this.filteredImages = this.allImages.filter((img) =>
        (img.tags || []).some((tag) => tags.includes(tag))
      );
    }
    this.render();
  }

  render() {
    const imagePath = "https://oscarbergstrom.netlify.app/src/assets/";
    const container = document.createElement("div");
    container.classList.add("work-list");

    this.filteredImages.forEach((img, index) => {
      const picture = document.createElement("picture");
      picture.innerHTML = `
        <img 
          src="${imagePath}size250${img.path}" 
          alt="${img.alt}" 
          loading="lazy" 
          srcset="
          ${imagePath}size250${img.path} 300w, 
          ${imagePath}size400${img.path} 600w, 
          ${imagePath}size800${img.path} 1000w, 
          ${imagePath}sizeOriginal${img.path} 2250w
        " sizes="
          (max-width: 300px) 250px, 
          (max-width: 600px) 400px, 
          (max-width: 1000px) 800px, 
          2250px
        ">
      `;
      const imgEl = picture.querySelector("img");
      imgEl.dataset.index = index;
      imgEl.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("image-clicked", {
            detail: { index },
            bubbles: true,
            composed: true,
          })
        );
      });

      const galleryItem = document.createElement("div");
      galleryItem.classList.add("gallery-item");
      galleryItem.appendChild(picture);

      const workAnimate = document.createElement("div");
      workAnimate.classList.add("work", "animate");
      workAnimate.appendChild(galleryItem);
      container.appendChild(workAnimate);
    });

    const style = document.createElement("style");
    style.textContent = `@import '/styles/style.css';`;

    this.shadowRoot.innerHTML = ""; // rensa allt
    this.shadowRoot.append(style, container);
  }
}

customElements.define("gallery-grid", GalleryGridComponent);
