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
  let closeTimer = 0;

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

  const cancelClose = () => {
    if (closeTimer) window.clearTimeout(closeTimer);
    closeTimer = 0;
  };
  const setSidebar = (open, focus = false, returnFocus = false) => {
    if (!sidebar || !backdrop) return;
    cancelClose();
    sidebar.classList.toggle("is-open", open);
    sidebar.setAttribute("aria-hidden", String(!open));
    backdrop.hidden = !open;
    if (openButton) openButton.setAttribute("aria-expanded", String(open));
    root.classList.toggle("sidebar-open-state", open);
    if (open && focus && closeButton) closeButton.focus();
    if (!open && returnFocus && openButton) openButton.focus();
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer = window.setTimeout(() => {
      const pointerInside = (sidebar && sidebar.matches(":hover")) ||
        (openButton && openButton.matches(":hover"));
      const focusInside = (sidebar && sidebar.contains(document.activeElement)) ||
        (openButton && openButton === document.activeElement);
      if (!pointerInside && !focusInside) setSidebar(false, false, false);
    }, 240);
  };

  if (openButton) {
    openButton.addEventListener("pointerenter", event => {
      if (event.pointerType !== "touch") setSidebar(true, false, false);
    });
    openButton.addEventListener("pointerleave", event => {
      if (event.pointerType !== "touch") scheduleClose();
    });
    openButton.addEventListener("focus", () => setSidebar(true, false, false));
    openButton.addEventListener("blur", () => window.setTimeout(() => {
      if (!sidebar || !sidebar.contains(document.activeElement)) scheduleClose();
    }, 0));
    openButton.addEventListener("click", () => {
      // Click remains the touch/mobile control; on desktop it pins/toggles the panel.
      setSidebar(!sidebar.classList.contains("is-open"), false, false);
    });
  }
  if (sidebar) {
    sidebar.addEventListener("pointerenter", cancelClose);
    sidebar.addEventListener("pointerleave", scheduleClose);
    sidebar.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setSidebar(false, false, false)));
  }
  if (closeButton) closeButton.addEventListener("click", () => setSidebar(false, false, true));
  if (backdrop) backdrop.addEventListener("click", () => setSidebar(false, false, false));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (sidebar && sidebar.classList.contains("is-open")) setSidebar(false, false, true);
      else if (overlay && !overlay.hidden) event.preventDefault();
    }
  });

  // Subtle scroll-in motion for sections and documentation, with graceful fallback.
  const revealTargets = document.querySelectorAll(
    ".section-head, .project-card, .status-inner, .community-wrap, .doc-hero, .doc-section, .update-card, .updates-note, .comments-heading, .comments-preview, .discussion-fallback-card"
  );
  if (revealTargets.length && "IntersectionObserver" in window) {
    root.classList.add("motion-ready");
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -28px 0px" });
    revealTargets.forEach((element, index) => {
      element.classList.add("motion-reveal");
      if (element.classList.contains("project-card")) {
        element.style.setProperty("--reveal-delay", (index % 4) * 65 + "ms");
      }
      revealObserver.observe(element);
    });
  }
})();