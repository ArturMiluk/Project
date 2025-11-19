class BurgerMenu {
  constructor() {
    this.burger = document.querySelector(".header__burger");
    this.nav = document.querySelector(".nav");
    this.overlay = document.createElement("div");
    this.overlay.className = "burger-overlay";

    document.body.appendChild(this.overlay);

    this.init();
  }

  init() {
    if (!this.burger || !this.nav) return;

    this.burger.addEventListener("click", () => this.toggle());
    this.overlay.addEventListener("click", () => this.close());

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) this.close();
    });

    this.setupMobileDropdowns();
  }

  setupMobileDropdowns() {
    document
      .querySelectorAll(".nav__item--dropdown > .nav__link")
      .forEach((link) => {
        link.addEventListener("click", (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = link.nextElementSibling;
            dropdown.classList.toggle("active");

            document
              .querySelectorAll(".nav__item--dropdown > .nav__dropdown")
              .forEach((otherDropdown) => {
                if (otherDropdown !== dropdown)
                  otherDropdown.classList.remove("active");
              });
          }
        });
      });
  }

  toggle() {
    this.burger.classList.toggle("active");
    this.nav.classList.toggle("active");
    this.overlay.classList.toggle("active");

    document.body.style.overflow = this.nav.classList.contains("active")
      ? "hidden"
      : "";
  }

  close() {
    this.burger.classList.remove("active");
    this.nav.classList.remove("active");
    this.overlay.classList.remove("active");
    document.body.style.overflow = "";

    document.querySelectorAll(".nav__dropdown").forEach((el) => {
      el.classList.remove("active");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new BurgerMenu());
