class GalleryFilterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.tags = new Set();
    this.selectedTags = new Set();
    this.showTags = false;
  }

  async connectedCallback() {
    const response = await fetch("/src/assets/img-data.JSON");
    const images = await response.json();

    images.forEach((img) => {
      (img.tags || []).forEach((tag) => this.tags.add(tag));
    });

    this.render();
  }

  toggleTag(tag) {
    if (this.selectedTags.has(tag)) {
      this.selectedTags.delete(tag);
    } else {
      this.selectedTags.add(tag);
    }
    this.dispatchFilterChange();
    this.render();
  }

  clearFilters() {
    this.selectedTags.clear();
    this.dispatchFilterChange();
    this.render();
  }

  dispatchFilterChange() {
    window.dispatchEvent(
      new CustomEvent("filter-change", {
        detail: Array.from(this.selectedTags),
      })
    );
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

        .icons {
          display: flex;
          gap: 10px;
          align-items: center;
          cursor: pointer;
          font-size: 1.2rem;
          color: white;
        }

        .filter-bar {
          display: ${this.showTags ? "flex" : "none"};
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .tag {
          padding: 4px 10px;
          border: 1px solid white;
          border-radius: 4px;
          cursor: pointer;
          color: white;
          background: transparent;
          transition: background 0.2s ease;
        }

        .tag.selected {
          background: white;
          color: black;
        }

        .hidden {
          display: none;
        }
      </style>

${
  this.selectedTags.size === 0
    ? `<i class="fa-solid fa-filter" id="toggleTags" title="Show filters"></i>`
    : `<i class="fa-solid fa-filter-circle-xmark" id="clearFilters" title="Clear filters"></i>`
}




      <div class="filter-bar">
        ${Array.from(this.tags)
          .map(
            (tag) => `
            <div class="tag ${
              this.selectedTags.has(tag) ? "selected" : ""
            }" data-tag="${tag}">
              ${tag}
            </div>
          `
          )
          .join("")}
      </div>
    `;

    this.shadowRoot
      .querySelector("#filterIcon")
      ?.addEventListener("click", () => {
        if (this.selectedTags.size === 0) {
          // Visa eller dölj taggar
          this.showTags = !this.showTags;
        } else {
          // Rensa filter, men visa filterbaren efteråt
          this.clearFilters();
          this.showTags = true;
        }
        this.render();
      });
    this.shadowRoot.querySelectorAll(".tag").forEach((el) => {
      el.addEventListener("click", () => this.toggleTag(el.dataset.tag));
    });
  }
}

customElements.define("gallery-filter", GalleryFilterComponent);
