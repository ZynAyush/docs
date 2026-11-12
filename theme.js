(() => {
  "use strict";
  const root = document.documentElement;
  const storageKey = "zynayush-theme";
  const themes = ["dark", "light", "oled"];
  const icons = { dark: "☾", light: "☼", oled: "◉" };
  const nextMode = { dark: "light", light: "oled", oled: "dark" };
  const readTheme = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (themes.includes(saved)) return saved;
    } catch (_) {}
    return "dark";
  };
  const applyTheme = (mode, persist = false) => {
    const current = themes.includes(mode) ? mode : "dark";
    root.setAttribute("data-theme", current);
    root.style.colorScheme = current === "oled" ? "dark" : current;
    root.classList.add("theme-animate");
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      const next = nextMode[current];
      const icon = button.querySelector(".theme-toggle-icon");
      button.setAttribute("aria-pressed", String(current !== "dark"));
      button.setAttribute("aria-label", "Current theme: " + current.toUpperCase() + ". Click to switch to " + next.toUpperCase() + " mode.");
      button.setAttribute("title", current.toUpperCase() + " mode · next: " + next.toUpperCase());
      if (icon) icon.textContent = icons[current];
      button.dataset.currentTheme = current;
    });
    if (persist) {
      try { localStorage.setItem(storageKey, current); } catch (_) {}
    }
    window.clearTimeout(applyTheme.timer);
    applyTheme.timer = window.setTimeout(() => root.classList.remove("theme-animate"), 450);
  };
  applyTheme(readTheme());
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-theme-toggle]");
    if (!button) return;
    const current = root.getAttribute("data-theme") || "dark";
    applyTheme(nextMode[current] || "dark", true);
  });
})();