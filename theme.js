(() => {
  "use strict";
  const root = document.documentElement;
  const key = "zynayush-theme";
  const getTheme = () => root.getAttribute("data-theme") === "light" ? "light" : "dark";
  const paint = (theme, persist = false) => {
    const mode = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", mode);
    root.style.colorScheme = mode;
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const next = mode === "dark" ? "light" : "dark";
      const icon = button.querySelector(".theme-toggle-icon");
      const label = button.querySelector(".theme-toggle-label");
      button.setAttribute("aria-pressed", String(mode === "light"));
      button.setAttribute("aria-label", "Switch to " + next + " mode");
      if (icon) icon.textContent = next === "light" ? "☀" : "☾";
      if (label) label.textContent = next.toUpperCase();
    });
    const frame = document.querySelector("iframe.giscus-frame");
    if (frame && frame.contentWindow) {
      frame.contentWindow.postMessage({ giscus: { setConfig: { theme: mode === "light" ? "light" : "dark_dimmed" } } }, "https://giscus.app");
    }
    if (persist) {
      try { localStorage.setItem(key, mode); } catch (_) {}
    }
  };
  paint(getTheme());
  const syncGiscus = () => {
    const frame = document.querySelector("iframe.giscus-frame");
    if (frame && frame.contentWindow) {
      frame.contentWindow.postMessage({ giscus: { setConfig: { theme: getTheme() === "light" ? "light" : "dark_dimmed" } } }, "https://giscus.app");
    }
  };
  if (document.body && "MutationObserver" in window) {
    const observer = new MutationObserver(syncGiscus);
    observer.observe(document.body, { childList: true, subtree: true });
  }
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-theme-toggle]");
    if (!button) return;
    paint(getTheme() === "dark" ? "light" : "dark", true);
  });
})();