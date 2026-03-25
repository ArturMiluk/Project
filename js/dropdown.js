class DropdownMenu {
  constructor() {
    this.dropdownItems = document.querySelectorAll(".nav__item--dropdown");
    if (this.dropdownItems.length > 0) {
      this.init();
    }
  }

  init() {
    this.dropdownItems.forEach((item) => {
      this.setupDropdown(item);
    });

    this.setupClickOutside();
    this.setupMobileBehavior();
    this.highlightActiveCity();
    this.setupCityClickHandlers();
  }

  setupDropdown(item) {
    const dropdown = item.querySelector(".nav__dropdown");
    if (!dropdown) return;

    item.addEventListener("mouseenter", () => {
      this.showDropdown(dropdown);
    });

    item.addEventListener("mouseleave", () => {
      this.hideDropdown(dropdown);
    });

    const link = item.querySelector(".nav__link");
    if (link) {
      link.addEventListener("click", (e) => {
        if (this.isMobile()) {
          e.preventDefault();
          this.toggleDropdown(dropdown);
        }
      });
    }
  }

  setupCityClickHandlers() {
    document.querySelectorAll(".nav__dropdown-item").forEach((cityLink) => {
      if (
        cityLink.getAttribute("href") &&
        cityLink.getAttribute("href").includes("churches.html")
      ) {
        cityLink.addEventListener("click", (e) => {
          e.preventDefault();

          const href = cityLink.getAttribute("href");

          if (href.includes("churches.html")) {
            if (href.includes("city=")) {
              const city = href.split("city=")[1];
              this.applyCityFilter(city);
            } else {
              this.applyCityFilter("belarus");
            }
          }

          this.closeAllDropdowns();
        });
      }
    });
  }

  applyCityFilter(city) {
    const isOnChurchesPage = window.location.pathname.includes("churches.html");

    if (isOnChurchesPage) {
      const newUrl =
        city === "belarus" ? "./churches.html" : `./churches.html?city=${city}`;

      window.history.pushState({}, "", newUrl);

      if (typeof window.filterByCity === "function") {
        window.filterByCity(city);
      }

      this.highlightActiveCity();
    } else {
      const newUrl =
        city === "belarus" ? "./churches.html" : `./churches.html?city=${city}`;

      window.location.href = newUrl;
    }

    this.closeAllDropdowns();
  }

  showDropdown(dropdown) {
    if (this.isMobile()) return;
    dropdown.style.opacity = "1";
    dropdown.style.visibility = "visible";
    dropdown.style.transform = "translateY(0)";
  }

  hideDropdown(dropdown) {
    if (this.isMobile()) return;
    dropdown.style.opacity = "0";
    dropdown.style.visibility = "hidden";
    dropdown.style.transform = "translateY(-0.625rem)";
  }

  toggleDropdown(dropdown) {
    const isVisible = dropdown.style.visibility === "visible";
    this.closeAllDropdowns();

    if (!isVisible) {
      dropdown.style.opacity = "1";
      dropdown.style.visibility = "visible";
      dropdown.style.transform = "translateY(0)";
      dropdown.classList.add("active");
    } else {
      dropdown.classList.remove("active");
    }
  }

  closeAllDropdowns() {
    document.querySelectorAll(".nav__dropdown").forEach((menu) => {
      menu.style.opacity = "0";
      menu.style.visibility = "hidden";
      menu.style.transform = "translateY(-0.625rem)";
      menu.classList.remove("active");
    });
  }

  setupClickOutside() {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav__item--dropdown")) {
        this.closeAllDropdowns();
      }
    });
  }

  setupMobileBehavior() {
    window.addEventListener("resize", () => {
      if (!this.isMobile()) {
        this.closeAllDropdowns();
      }
    });
  }

  highlightActiveCity() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCity = urlParams.get("city");
    const currentPage = window.location.pathname;

    document.querySelectorAll(".nav__dropdown-item").forEach((city) => {
      city.classList.remove("nav__dropdown-item--active");
    });

    if (currentPage.includes("churches.html")) {
      let activeCity;
      if (selectedCity) {
        activeCity = document.querySelector(
          `.nav__dropdown-item[href*="city=${selectedCity}"]`,
        );
      } else {
        activeCity = document.querySelector(
          '.nav__dropdown-item[href="./churches.html"]',
        );
      }

      if (activeCity) {
        activeCity.classList.add("nav__dropdown-item--active");
      }
    }
  }

  isMobile() {
    return window.innerWidth <= 768;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new DropdownMenu();
});

function updateActiveCity(city = null) {
  if (city) {
    const newUrl =
      city === "belarus" ? "./churches.html" : `./churches.html?city=${city}`;
    window.history.replaceState({}, "", newUrl);
  }

  const dropdown = document.querySelector(".nav__item--dropdown");
  if (dropdown) {
    const menu = new DropdownMenu();
    menu.highlightActiveCity();
  }
}
