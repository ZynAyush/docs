(() => {
  "use strict";
  const disclaimerKey = "zynayush-disclaimer-accepted-v1";
  const overlay = document.getElementById("site-disclaimer");
  const accept = document.querySelector("[data-disclaimer-accept]");
  const sidebar = document.getElementById("site-sidebar");
  const backdrop = document.querySelector("[data-sidebar-backdrop]");
  const openButton = document.querySelector("[data-sidebar-open]");
  const closeButton = document.querySelector("[data-sidebar-close]");
  const root = document.documentElement;

  let accepted = false;
  try { accepted = localStorage.getItem(disclaimerKey) === "yes"; } catch (_) {}
  if (overlay) {
    if (accepted) overlay.hidden = true;
    else {
      root.classList.add("disclaimer-open");
      window.setTimeout(() => accept && accept.focus(), 0);
    }
  }
  if (accept && overlay) {
    accept.addEventListener("click", () => {
      try { localStorage.setItem(disclaimerKey, "yes"); } catch (_) {
        const note = overlay.querySelector(".disclaimer-note");
        if (note) note.textContent = "Storage is blocked in this browser. Please enable site storage to remember acceptance.";
        return;
      }
      overlay.hidden = true;
      root.classList.remove("disclaimer-open");
      if (openButton) openButton.focus();
    });
  }

  const setSidebar = (open) => {
    if (!sidebar || !backdrop) return;
    sidebar.classList.toggle("is-open", open);
    sidebar.setAttribute("aria-hidden", String(!open));
    backdrop.hidden = !open;
    if (openButton) openButton.setAttribute("aria-expanded", String(open));
    root.classList.toggle("sidebar-open-state", open);
    if (open && closeButton) closeButton.focus();
    if (!open && openButton) openButton.focus();
  };
  if (openButton) openButton.addEventListener("click", () => setSidebar(true));
  if (closeButton) closeButton.addEventListener("click", () => setSidebar(false));
  if (backdrop) backdrop.addEventListener("click", () => setSidebar(false));
  if (sidebar) sidebar.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setSidebar(false)));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (sidebar && sidebar.classList.contains("is-open")) setSidebar(false);
      else if (overlay && !overlay.hidden) event.preventDefault();
    }
  });
})();