(() => {
  "use strict";

  const topbar = document.querySelector(".topbar");
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");
  const yearTargets = document.querySelectorAll("[data-year]");

  const setMenuState = (isOpen) => {
    if (!menuButton || !nav) return;

    document.body.classList.toggle("nav-open", isOpen);
    nav.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  };

  const updateHeader = () => {
    if (!topbar) return;
    topbar.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      setMenuState(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuState(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 901px)").matches) {
        setMenuState(false);
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", href);
    });
  });

  yearTargets.forEach((target) => {
    target.textContent = new Date().getFullYear();
  });

  const backTop = document.createElement("button");
  backTop.className = "back-top";
  backTop.type = "button";
  backTop.setAttribute("aria-label", "Volver arriba");
  backTop.innerHTML = '<span class="material-symbols-rounded" aria-hidden="true">keyboard_arrow_up</span>';
  document.body.append(backTop);

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const updateBackTop = () => {
    backTop.classList.toggle("is-visible", window.scrollY > 560);
  };

  updateHeader();
  updateBackTop();
  window.addEventListener("scroll", () => {
    updateHeader();
    updateBackTop();
  }, { passive: true });
})();
