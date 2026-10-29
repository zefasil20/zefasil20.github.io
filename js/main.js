(() => {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.querySelector("#theme-toggle");
  const menuToggle = document.querySelector("#menu-toggle");
  const primaryNav = document.querySelector("#primary-nav");
  const currentYear = document.querySelector("#current-year");
  const backToTop = document.querySelector(".back-to-top");

  function getTheme() {
    return root.dataset.theme === "light" ? "light" : "dark";
  }

  function setTheme(theme, persist = true) {
    const nextTheme = theme === "light" ? "light" : "dark";
    root.dataset.theme = nextTheme;

    if (themeToggle) {
      const isDark = nextTheme === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
      const label = themeToggle.querySelector(".theme-label");
      if (label) label.textContent = isDark ? "Dark mode" : "Light mode";
    }

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute("content", nextTheme === "dark" ? "#111512" : "#f7f8f5");
    }

    if (persist) {
      try {
        localStorage.setItem("portfolio-theme", nextTheme);
      } catch (_) {
        // The theme still works for this page view when storage is unavailable.
      }
    }
  }

  setTheme(getTheme(), false);

  themeToggle?.addEventListener("click", () => {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  });

  function closeMenu() {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav?.classList.toggle("is-open", !isOpen);
  });

  primaryNav?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.classList.toggle("is-visible", window.scrollY > 500);
    };
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });
  }
})();
