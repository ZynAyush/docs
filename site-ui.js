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
  let lastInputWasKeyboard = false;

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

  const isTouchLayout = () => !!(window.matchMedia && window.matchMedia("(hover: none), (pointer: coarse)").matches);
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
    // Touch drawers are click/swipe controlled; never dismiss them on pointerleave.
    if (isTouchLayout()) return;
    cancelClose();
    closeTimer = window.setTimeout(() => {
      const pointerInside = (sidebar && sidebar.matches(":hover")) ||
        (openButton && openButton.matches(":hover"));
      const keyboardFocusInside = lastInputWasKeyboard &&
        ((sidebar && sidebar.contains(document.activeElement)) ||
         (openButton && openButton === document.activeElement));
      if (!pointerInside && !keyboardFocusInside) setSidebar(false, false, false);
    }, 240);
  };

  if (openButton) {
    openButton.addEventListener("mouseenter", () => {
      if (isTouchLayout()) return;
      lastInputWasKeyboard = false;
      setSidebar(true, false, false);
    });
    openButton.addEventListener("mouseleave", () => {
      if (!isTouchLayout()) scheduleClose();
    });
    openButton.addEventListener("pointerenter", event => {
      if (event.pointerType !== "touch" && !isTouchLayout()) {
        lastInputWasKeyboard = false;
        setSidebar(true, false, false);
      }
    });
    openButton.addEventListener("pointerleave", event => {
      if (event.pointerType !== "touch" && !isTouchLayout()) scheduleClose();
    });
    openButton.addEventListener("focus", () => {
      if (lastInputWasKeyboard) setSidebar(true, false, false);
    });
    openButton.addEventListener("click", () => {
      if (isTouchLayout()) setSidebar(!sidebar.classList.contains("is-open"), false, false);
      else setSidebar(true, false, false);
    });
  }
  document.addEventListener("pointerdown", event => {
    if (event.pointerType !== "touch") lastInputWasKeyboard = false;
  }, true);
  document.addEventListener("keydown", event => {
    if (event.key === "Tab" || event.key.startsWith("Arrow")) lastInputWasKeyboard = true;
  }, true);
  document.addEventListener("pointerover", event => {
    if (isTouchLayout() || event.pointerType === "touch") return;
    if (openButton && openButton.contains(event.target)) {
      lastInputWasKeyboard = false;
      setSidebar(true, false, false);
    }
    if (sidebar && sidebar.contains(event.target)) cancelClose();
  });
  document.addEventListener("pointerout", event => {
    if (isTouchLayout() || event.pointerType === "touch") return;
    if (openButton && openButton.contains(event.target) && !openButton.contains(event.relatedTarget)) scheduleClose();
    if (sidebar && sidebar.contains(event.target) && !sidebar.contains(event.relatedTarget)) scheduleClose();
  });
  if (sidebar) {
    sidebar.addEventListener("mouseenter", () => { if (!isTouchLayout()) cancelClose(); });
    sidebar.addEventListener("mouseleave", () => { if (!isTouchLayout()) scheduleClose(); });
    sidebar.addEventListener("pointerenter", event => { if (event.pointerType !== "touch" && !isTouchLayout()) cancelClose(); });
    sidebar.addEventListener("pointerleave", event => { if (event.pointerType !== "touch" && !isTouchLayout()) scheduleClose(); });
    sidebar.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setSidebar(false, false, false)));
  }
  if (closeButton) closeButton.addEventListener("click", () => setSidebar(false, false, true));
  if (backdrop) backdrop.addEventListener("click", () => setSidebar(false, false, false));

  // Touch drawer gestures: swipe right from anywhere to open, swipe left to close.
  let touchStart = null;
  document.addEventListener("touchstart", event => {
    if (event.touches.length !== 1) { touchStart = null; return; }
    const touch = event.touches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true, capture: true });
  document.addEventListener("touchend", event => {
    if (!touchStart || !event.changedTouches.length || !isTouchLayout()) { touchStart = null; return; }
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(deltaX) < 72 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
    const isOpen = sidebar && sidebar.classList.contains("is-open");
    if (!isOpen && deltaX > 72) setSidebar(true, false, false);
    else if (isOpen && deltaX < -72) setSidebar(false, false, false);
  }, { passive: true, capture: true });
  document.addEventListener("touchcancel", () => { touchStart = null; }, { passive: true, capture: true });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (sidebar && sidebar.classList.contains("is-open")) setSidebar(false, false, true);
      else if (overlay && !overlay.hidden) event.preventDefault();
    }
  });

  // Subtle scroll-in motion for sections and documentation, with graceful fallback.
  const revealTargets = document.querySelectorAll(
    ".hero .eyebrow, .hero h1, .hero-desc, .hero-meta, .hero .pixel-btn, .art-frame, .section-head, .project-card, .status-inner, .community-wrap, .doc-hero, .doc-section, .update-card, .updates-note, .comments-heading, .comments-preview, .discussion-fallback-card"
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
/* Whole project card opens its documentation; nested source/download links keep their own actions. */
document.querySelectorAll(".project-card[data-doc-url]").forEach(card => {
  card.style.cursor = "pointer";
  card.addEventListener("click", event => {
    if (event.target.closest("a,button")) return;
    window.location.href = card.dataset.docUrl;
  });
  card.addEventListener("keydown", event => {
    if (event.target !== card) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.location.href = card.dataset.docUrl;
    }
  });
});

/* Global utility panels: bug reporting, back-to-top, and page translation. */
(() => {
  "use strict";
  const bugPanel = document.getElementById("bug-report-panel");
  const bugGithub = document.getElementById("bug-github-choice");
  const bugClose = document.querySelector("[data-bug-close]");
  let previousFocus = null;
  const openBugPanel = trigger => {
    if (!bugPanel || !bugGithub) return;
    previousFocus = trigger;
    const issueUrl = trigger && trigger.dataset.githubIssue;
    bugGithub.href = issueUrl || "https://github.com/ZynAyush/docs/issues";
    bugPanel.hidden = false;
    bugPanel.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("bug-report-open");
    if (bugClose) bugClose.focus();
  };
  const closeBugPanel = () => {
    if (!bugPanel) return;
    bugPanel.hidden = true;
    bugPanel.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("bug-report-open");
    if (previousFocus && previousFocus.focus) previousFocus.focus();
  };
  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-bug-report]");
    if (trigger) {
      event.preventDefault();
      openBugPanel(trigger);
      return;
    }
    if (event.target.closest("[data-bug-close]")) {
      closeBugPanel();
      return;
    }
    if (bugPanel && event.target === bugPanel) closeBugPanel();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && bugPanel && !bugPanel.hidden) closeBugPanel();
  });

  const topButton = document.querySelector("[data-back-to-top]");
  if (topButton) {
    const updateTopButton = () => topButton.classList.toggle("is-visible", window.scrollY > 300);
    updateTopButton();
    window.addEventListener("scroll", updateTopButton, { passive: true });
    topButton.addEventListener("click", () => {
      const reduceMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  const languageSelect = document.getElementById("site-language-select");
  const translateButton = document.querySelector("[data-translate-page]");
  if (translateButton && languageSelect) {
    translateButton.addEventListener("click", () => {
      const language = languageSelect.value;
      if (!language) {
        languageSelect.focus();
        return;
      }
      const target = "https://translate.google.com/translate?sl=auto&tl=" +
        encodeURIComponent(language) + "&u=" + encodeURIComponent(window.location.href);
      window.location.assign(target);
    });
  }
})();
