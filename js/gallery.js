(() => {
  "use strict";

  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-image");
  const closeButton = document.querySelector("[data-lightbox-close]");
  const prevButton = document.querySelector("[data-lightbox-prev]");
  const nextButton = document.querySelector("[data-lightbox-next]");
  const counter = document.querySelector("[data-lightbox-counter]");

  if (!items.length || !lightbox || !image) return;

  let currentIndex = 0;
  let touchStartX = 0;
  let lastFocusedElement = null;

  const update = () => {
    const item = items[currentIndex];
    image.src = item.dataset.gallerySrc || item.querySelector("img")?.src || "";
    image.alt = item.dataset.galleryAlt || item.querySelector("img")?.alt || "Captura de CFDI Verifier";

    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${items.length}`;
    }
  };

  const open = (index) => {
    currentIndex = index;
    lastFocusedElement = document.activeElement;
    update();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton?.focus();
  };

  const close = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    lastFocusedElement?.focus?.();
  };

  const move = (direction) => {
    currentIndex = (currentIndex + direction + items.length) % items.length;
    update();
  };

  items.forEach((item, index) => {
    item.addEventListener("click", () => open(index));
  });

  closeButton?.addEventListener("click", close);
  prevButton?.addEventListener("click", () => move(-1));
  nextButton?.addEventListener("click", () => move(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });

  lightbox.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) < 50) return;
    move(distance > 0 ? -1 : 1);
  }, { passive: true });
})();
