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

/* DiscordSRV-style site search — search-only feature, kept independent of the site layout. */
(() => {
  "use strict";
  if (document.getElementById("site-search-overlay")) return;

  const pages = [
    ["Home", "/docs/home/", "Main project archive · Minecraft projects and tools"],
    ["Projects", "/docs/projects/", "All public Minecraft projects · mods plugins resource packs"],
    ["About Me", "/docs/about/", "About ZynAyush and development focus"],
    ["Documentation", "/docs/docs/", "Project guides installation setup and troubleshooting"],
    ["FAQ", "/docs/faq/", "Common questions and answers"],
    ["Updates", "/docs/updates/", "Project releases changes and updates"],
    ["Community", "/docs/community/", "Discord discussions help and feedback"],
    ["Carpet Fake Players", "/docs/carpet-fake-players/", "Paper Purpur fake player plugin bots"],
    ["ZeroXFog", "/docs/zeroxfog/", "Minecraft resource pack fog Nether End caves"],
    ["Netherite Stones & Ores", "/docs/netherite-stones-ores/", "Minecraft resource pack textures ores stones"],
    ["Smooth Fonts 32x", "/docs/smooth-fonts-32x/", "Minecraft font resource pack UI readability"],
    ["Zyn’s Better Teams", "/docs/zyns-better-teams/", "Fabric server-side team management mod"]
  ];

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "site-search-trigger";
  trigger.setAttribute("aria-label", "Search this website");
  trigger.innerHTML = '<span aria-hidden="true">⌕</span><span class="site-search-trigger-label">Search</span><kbd>Ctrl K</kbd>';
  const logo = document.querySelector(".site-header .logo");
  const header = document.querySelector(".site-header");
  if (logo) logo.insertAdjacentElement("afterend", trigger);
  else if (header) header.appendChild(trigger);
  else return;

  const overlay = document.createElement("div");
  overlay.className = "site-search-overlay";
  overlay.id = "site-search-overlay";
  overlay.hidden = true;
  overlay.innerHTML = '<section class="site-search-dialog" role="dialog" aria-modal="true" aria-label="Search this website"><div class="site-search-row"><span aria-hidden="true">⌕</span><input id="site-search-input" type="search" autocomplete="off" placeholder="Search projects, guides, updates…" aria-label="Search this website"><button type="button" class="site-search-close" aria-label="Close search">×</button></div><div class="site-search-results" id="site-search-results" aria-live="polite"><p>Search project pages, guides, FAQs and updates.</p></div><div class="site-search-footer"><span>↑ ↓ to browse</span><span>ENTER to open</span><span>ESC to close</span></div></section>';
  document.body.appendChild(overlay);

  const input = overlay.querySelector("#site-search-input");
  const results = overlay.querySelector("#site-search-results");
  const closeButton = overlay.querySelector(".site-search-close");
  let previousFocus = null;
  let activeIndex = -1;

  const render = (query) => {
    const term = (query || "").trim().toLowerCase();
    const matches = pages.filter((page) => !term || page.join(" ").toLowerCase().includes(term));
    results.replaceChildren();
    activeIndex = -1;
    if (!matches.length) {
      const empty = document.createElement("p");
      empty.textContent = "No matching pages. Try a project name or “installation”.";
      results.appendChild(empty);
      return;
    }
    matches.forEach((page) => {
      const link = document.createElement("a");
      link.href = page[1];
      const title = document.createElement("strong");
      title.textContent = page[0];
      const description = document.createElement("small");
      description.textContent = page[2];
      link.append(title, description);
      results.appendChild(link);
    });
  };
  const open = () => {
    previousFocus = document.activeElement;
    overlay.hidden = false;
    document.documentElement.classList.add("site-search-open");
    render(input.value);
    input.focus();
  };
  const close = () => {
    overlay.hidden = true;
    document.documentElement.classList.remove("site-search-open");
    if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
  };
  const move = (direction) => {
    const links = Array.from(results.querySelectorAll("a"));
    if (!links.length) return;
    activeIndex = (activeIndex + direction + links.length) % links.length;
    links.forEach((link, index) => link.classList.toggle("is-active", index === activeIndex));
    links[activeIndex].focus();
  };

  trigger.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  input.addEventListener("input", () => render(input.value));
  overlay.addEventListener("click", (event) => { if (event.target === overlay) close(); });
  results.addEventListener("click", (event) => { if (event.target.closest("a")) close(); });
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (overlay.hidden) open(); else input.focus();
      return;
    }
    if (overlay.hidden) return;
    if (event.key === "Escape") { event.preventDefault(); close(); }
    if (event.key === "ArrowDown") { event.preventDefault(); move(1); }
    if (event.key === "ArrowUp") { event.preventDefault(); move(-1); }
    if (event.key === "Enter" && document.activeElement === input) {
      const first = results.querySelector("a");
      if (first) window.location.href = first.href;
    }
  });
})();

/* Search component styling is scoped so the restored site theme and layout stay unchanged. */
(() => {
  if (document.getElementById("site-search-styles")) return;
  const style = document.createElement("style");
  style.id = "site-search-styles";
  style.textContent = `
    .site-search-trigger{display:inline-flex;align-items:center;gap:7px;margin:0 10px;padding:8px 10px;border:1px solid var(--line,rgba(150,170,190,.25));border-radius:7px;background:var(--panel2,rgba(20,30,45,.8));color:var(--muted,#9aa9ba);font:12px inherit;cursor:pointer;white-space:nowrap}
    .site-search-trigger:hover,.site-search-trigger:focus-visible{border-color:var(--cyan,#55d8e8);color:var(--white,#fff);outline:none}
    .site-search-trigger>span:first-child{font-size:19px;line-height:12px;color:var(--cyan,#55d8e8)}
    .site-search-trigger kbd{font:10px inherit;border:1px solid var(--line,rgba(150,170,190,.25));border-radius:4px;padding:2px 4px;color:var(--muted,#9aa9ba)}
    .site-search-overlay{position:fixed;inset:0;z-index:10030;display:grid;place-items:start center;padding:14vh 18px 28px;background:rgba(0,0,0,.64);backdrop-filter:blur(6px)}
    .site-search-overlay[hidden]{display:none!important}
    .site-search-dialog{width:min(620px,100%);overflow:hidden;border:1px solid var(--line,rgba(150,170,190,.3));border-radius:13px;background:var(--panel,#101827);color:var(--white,#fff);box-shadow:0 25px 90px #0009}
    .site-search-row{display:flex;align-items:center;gap:12px;padding:15px 17px;border-bottom:1px solid var(--line,rgba(150,170,190,.25));color:var(--cyan,#55d8e8);font-size:22px}
    .site-search-row input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:var(--white,#fff);font:14px inherit}
    .site-search-row input::placeholder{color:var(--muted,#9aa9ba)}
    .site-search-close{border:0;background:transparent;color:var(--muted,#9aa9ba);font-size:25px;cursor:pointer}
    .site-search-results{max-height:52vh;overflow:auto;padding:10px}
    .site-search-results a{display:flex;flex-direction:column;gap:4px;padding:11px 12px;border-radius:7px;color:var(--white,#fff);text-decoration:none}
    .site-search-results a:hover,.site-search-results a:focus,.site-search-results a.is-active{outline:0;background:var(--panel2,rgba(120,150,180,.12))}
    .site-search-results small{color:var(--muted,#9aa9ba);font-size:11px}
    .site-search-results p{margin:0;padding:12px;color:var(--muted,#9aa9ba);font-size:12px}
    .site-search-footer{display:flex;justify-content:flex-end;gap:15px;padding:9px 14px;border-top:1px solid var(--line,rgba(150,170,190,.2));color:var(--muted,#9aa9ba);font-size:10px}
    .site-search-open{overflow:hidden}
    @media(max-width:760px){.site-search-trigger{margin-left:auto;margin-right:8px;padding:8px}.site-search-trigger-label,.site-search-trigger kbd{display:none}.site-search-overlay{padding-top:10vh}}
    @media(prefers-reduced-motion:reduce){.site-search-overlay *{scroll-behavior:auto!important;transition:none!important}}
  `;
  document.head.appendChild(style);
})();

