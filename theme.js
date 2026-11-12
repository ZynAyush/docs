(() => {
  "use strict";
  const root = document.documentElement;
  const storageKey = "zynayush-theme";
  const validTheme = value => value === "light" ? "light" : "dark";
  const readTheme = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "light" || saved === "dark") return saved;
    } catch (_) {}
    return validTheme(root.getAttribute("data-theme"));
  };

  const applyTheme = (theme, save = false) => {
    const mode = validTheme(theme);
    root.setAttribute("data-theme", mode);
    root.style.colorScheme = mode;
    root.classList.add("theme-animate");
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      const next = mode === "dark" ? "light" : "dark";
      const icon = button.querySelector(".theme-toggle-icon");
      const label = button.querySelector(".theme-toggle-label");
      button.setAttribute("aria-pressed", String(mode === "light"));
      button.setAttribute("aria-label", "Switch to " + next + " mode");
      button.setAttribute("title", "Switch to " + next + " mode");
      if (icon) icon.textContent = next === "light" ? "☀" : "☾";
      if (label) label.textContent = next.toUpperCase();
    });
    if (save) {
      try { localStorage.setItem(storageKey, mode); } catch (_) {}
    }
    window.clearTimeout(applyTheme.transitionTimer);
    applyTheme.transitionTimer = window.setTimeout(() => root.classList.remove("theme-animate"), 520);
  };

  applyTheme(readTheme(), false);
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-theme-toggle]");
    if (!button) return;
    applyTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light", true);
  });
})();