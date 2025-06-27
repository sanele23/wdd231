document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("mainNav");

  function toggleMenu(e) {
    // Prevent double firing on touch
    if (e) e.preventDefault();
    const isOpen = nav.classList.toggle("open");
    hamburgerBtn.classList.toggle("active");
    hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (isOpen) {
      const firstLink = nav.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleMenu);
    hamburgerBtn.addEventListener("touchstart", toggleMenu, { passive: false });
  }

  // Close menu when a link is clicked (mobile only)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        nav.classList.remove("open");
        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Close with ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      hamburgerBtn.classList.remove("active");
      hamburgerBtn.setAttribute("aria-expanded", "false");
      hamburgerBtn.focus();
    }
  });
});
