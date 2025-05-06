class GallerySearchComponent extends HTMLElement {
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

        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin: 20px;
        }

        .top-row {
          gap: 12px;
          width: 100%;
          max-width: 700px;
          display: flex;
        }

        .search-container {
          position: relative;
          flex: 1;
          min-width: 250px;
          width: 100%;
        }

        input {
          width: 100%;
          font-size: 1rem;
          background-color: transparent;
          border: 2px solid white;
          outline: none;
          padding: 10px 0;
        }

        button {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          font-size: 0.75rem;
          color: white;
          cursor: pointer;
        }

        .filter-icons {
          display: flex;
          gap: 10px;
          align-items: center;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .filter-tags {
          display: ${this.showTags ? "flex" : "none"};
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          width: 100%;
          max-width: 700px;
          padding: 10px;
          background-color: transparent;
          border-radius: 4px;
          z-index: 1;
          position: relative;
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

        @media (max-width: 600px) {
          .top-row {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-tags {
            justify-content: flex-start;
          }
        }
      </style>

      <div class="wrapper">
        <div class="top-row">
          <div class="search-container">
            <input type="text" placeholder="Search images..." data-i18n="portfolio.search_placeholder" />
            <button id="clear"><i class="fa-solid fa-x"></i></button>
          </div>
          <div class="filter-icons">
            <i class="fa-solid fa-filter" id="toggleTags"></i>
            <i class="fa-solid fa-filter-circle-xmark ${
              this.selectedTags.size === 0 ? "hidden" : ""
            }" id="clearFilters"></i>
          </div>
        </div>

        <div class="filter-tags">
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
      </div>
    `;

    const input = this.shadowRoot.querySelector("input");
    const clearButton = this.shadowRoot.querySelector("#clear");
    const toggleTags = this.shadowRoot.querySelector("#toggleTags");
    const clearFilters = this.shadowRoot.querySelector("#clearFilters");

    input.addEventListener("input", () => {
      this.dispatchEvent(
        new CustomEvent("search-change", {
          detail: input.value,
          bubbles: true,
          composed: true,
        })
      );
    });

    clearButton.addEventListener("click", () => {
      input.value = "";
      input.dispatchEvent(new Event("input"));
    });

    toggleTags.addEventListener("click", () => {
      this.showTags = !this.showTags;
      this.render();
    });

    clearFilters?.addEventListener("click", () => {
      this.clearFilters();
    });

    this.shadowRoot.querySelectorAll(".tag").forEach((el) => {
      el.addEventListener("click", () => this.toggleTag(el.dataset.tag));
    });
  }
}

customElements.define("gallery-search", GallerySearchComponent);
