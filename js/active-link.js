document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav__link, .nav__link--info");
  const dropdownParents = document.querySelectorAll(
    ".nav__item--dropdown > .nav__link"
  );

  let currentPath = window.location.pathname;

  if (currentPath.endsWith("/")) {
    currentPath += "index.html";
  }

  currentPath = currentPath.split("/").pop().split("?")[0];

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const normalizedHref = href.replace("./", "").split("?")[0];

    if (normalizedHref === currentPath) {
      link.classList.add("nav__link--active");
    }

    if (currentPath === "index.html" && (href === "./" || href === "/")) {
      link.classList.add("nav__link--active");
    }
  });

  dropdownParents.forEach((parent) => {
    const dropdownItems = parent.parentElement.querySelectorAll(
      ".nav__dropdown-item"
    );

    dropdownItems.forEach((item) => {
      const href = item.getAttribute("href");
      if (!href) return;

      const normalizedHref = href.replace("./", "").split("?")[0];

      if (normalizedHref === currentPath) {
        parent.classList.add("nav__link--active");
      }
    });

    if (
      currentPath === "churches.html" &&
      parent.textContent.trim() === "Храмы"
    ) {
      parent.classList.add("nav__link--active");
    }
  });

  document.querySelectorAll("[data-no-open]").forEach((item) => {
    item.addEventListener("click", (e) => e.preventDefault());
  });
});
