type VizMount = { svg?: SVGSVGElement | null; div?: HTMLElement | null; legend?: HTMLElement | null };

let allowHashWrite = true;

function isMobile() {
  return window.innerWidth <= 900;
}

function getSections() {
  const textSections = Array.from(document.querySelectorAll<HTMLElement>(".scroll-section"));
  return textSections
    .map((el, index) => {
      const id = el.id;
      const vizId = el.dataset.vizId || "";
      return { textId: id, vizId, navIndex: index };
    })
    .filter((s) => s.textId && s.vizId);
}

function updateNavDots(activeIndex: number) {
  document.querySelectorAll<HTMLElement>(".nav-dot").forEach((dot, i) => {
    dot.classList.toggle("active", activeIndex >= 0 && i === activeIndex);
  });
}

function updateHash(sectionId: string) {
  if (!allowHashWrite) return;
  const newHash = "#" + sectionId;
  if (window.location.hash !== newHash) history.replaceState(null, "", newHash);
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;
  return Boolean(target.closest('[contenteditable="true"]'));
}

function shouldIgnoreKeyboardNav(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (isEditableTarget(target)) return true;
  return Boolean(target.closest("#viz-column, #viz-panels-container, .dl-viz"));
}

function getActiveSectionIndex(sections: Array<{ textId: string; vizId: string; navIndex: number }>) {
  const dots = Array.from(document.querySelectorAll<HTMLElement>(".nav-dot"));
  const activeDot = dots.find((dot) => dot.classList.contains("active"));
  if (activeDot) {
    const idx = dots.indexOf(activeDot);
    if (idx >= 0) return idx;
  }

  const hash = window.location.hash.slice(1);
  const fromHash = sections.findIndex((s) => s.textId === hash);
  if (fromHash >= 0) return fromHash;

  return 0;
}

function isInHeroRegion(sections: Array<{ textId: string; vizId: string; navIndex: number }>) {
  const first = sections[0];
  if (!first) return window.scrollY < 80;

  const firstEl = document.getElementById(first.textId);
  if (!firstEl) return window.scrollY < 80;

  if (isMobile()) {
    const stickyH = document.getElementById("viz-column")?.offsetHeight || 300;
    return window.scrollY < stickyH * 0.25;
  }

  return firstEl.getBoundingClientRect().top > window.innerHeight * 0.42;
}

function getKeyboardNavIndex(sections: Array<{ textId: string; vizId: string; navIndex: number }>) {
  if (isInHeroRegion(sections)) return -1;
  return getActiveSectionIndex(sections);
}

function scrollToHero(sections: Array<{ textId: string; vizId: string; navIndex: number }>) {
  const hero = document.getElementById("hero");
  if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
  else window.scrollTo({ top: 0, behavior: "smooth" });

  sections.forEach((s) => {
    const el = document.getElementById(s.textId);
    if (el) el.classList.remove("is-active");
  });

  if (sections[0]) {
    switchViz(sections[0].vizId);
    syncMobileTab(sections[0].vizId);
  }

  updateNavDots(-1);

  if (allowHashWrite) {
    const base = window.location.pathname + window.location.search;
    if (window.location.hash) history.replaceState(null, "", base);
  }
}

function scrollToSection(
  section: { textId: string; vizId: string; navIndex: number },
  sections: Array<{ textId: string; vizId: string; navIndex: number }>,
) {
  const sectionEl = document.getElementById(section.textId);
  if (!sectionEl) return;

  sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });

  sections.forEach((s) => {
    const el = document.getElementById(s.textId);
    if (el) el.classList.toggle("is-active", s.textId === section.textId);
  });

  switchViz(section.vizId);
  syncMobileTab(section.vizId);
  updateNavDots(section.navIndex);
  updateHash(section.textId);
}

function initKeyboardNav(sections: Array<{ textId: string; vizId: string; navIndex: number }>) {
  window.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (shouldIgnoreKeyboardNav(e.target)) return;

    const current = getKeyboardNavIndex(sections);
    const next = current + (e.key === "ArrowRight" ? 1 : -1);
    if (next < -1 || next >= sections.length) return;

    e.preventDefault();

    if (next === -1) {
      scrollToHero(sections);
      return;
    }

    scrollToSection(sections[next], sections);
  });
}

function syncMobileTab(vizId: string) {
  document.querySelectorAll<HTMLElement>(".mob-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.viz === vizId);
  });
  const activeTab = document.querySelector<HTMLElement>(`.mob-tab[data-viz="${vizId}"]`);
  if (activeTab) activeTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
}

function getPanelMount(panelEl: HTMLElement): VizMount {
  const svg = panelEl.querySelector<SVGSVGElement>("[data-viz-mount='svg']");
  const div = panelEl.querySelector<HTMLElement>("[data-viz-mount='div']");
  const legend = panelEl.querySelector<HTMLElement>("[data-viz-legend]");
  return { svg, div, legend };
}

function getPanelProps(panelEl: HTMLElement): any {
  const scriptEl = panelEl.querySelector<HTMLScriptElement>("script[data-viz-props]");
  const raw = scriptEl?.textContent;
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  const dataEl = panelEl.querySelector<HTMLElement>("[data-viz-props-json]");
  const attr = dataEl?.getAttribute("data-viz-props-json");
  if (!attr) return null;
  try {
    return JSON.parse(attr);
  } catch {
    return null;
  }
}

const vizInitialized: Record<string, boolean> = {};

function panelNeedsInit(panelEl: HTMLElement): boolean {
  if (!vizInitialized[panelEl.id]) return true;
  const mount = getPanelMount(panelEl);
  const mountEl = mount.div ?? mount.svg;
  const text = mountEl?.textContent?.trim() ?? '';
  if (text.startsWith('Unknown diagram:')) return true;
  return false;
}

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    for (const key of Object.keys(vizInitialized)) delete vizInitialized[key];
  });
}

async function initViz(panelEl: HTMLElement) {
  const vizKey = panelEl.dataset.vizKey || "";
  const mount = getPanelMount(panelEl);
  const props = getPanelProps(panelEl);

  type VizRenderer = (args: Record<string, unknown>) => void;

  const loaders: Record<string, () => Promise<{ default: VizRenderer }>> = {
    timeline: () => import('./viz/timeline') as Promise<{ default: VizRenderer }>,
    bubbles: () => import('./viz/bubbles') as Promise<{ default: VizRenderer }>,
    sem: () => import('./viz/sem') as Promise<{ default: VizRenderer }>,
    scatter: () => import('./viz/scatter') as Promise<{ default: VizRenderer }>,
    matrix: () => import('./viz/matrix') as Promise<{ default: VizRenderer }>,
    bars: () => import('./viz/bars') as Promise<{ default: VizRenderer }>,
    map: () => import('./viz/map') as Promise<{ default: VizRenderer }>,
    market: () => import('./viz/market') as Promise<{ default: VizRenderer }>,
    equation: () => import('./viz/equation') as Promise<{ default: VizRenderer }>,
    dualmap: () => import('./viz/dualmap') as Promise<{ default: VizRenderer }>,
    accuracy: () => import('./viz/accuracy') as Promise<{ default: VizRenderer }>,
    precision: () => import('./viz/precision') as Promise<{ default: VizRenderer }>,
    sentiment: () => import('./viz/sentiment') as Promise<{ default: VizRenderer }>,
    upgrade: () => import('./viz/upgrade') as Promise<{ default: VizRenderer }>,
    flow: () => import('./viz/delivery-flow') as Promise<{ default: VizRenderer }>,
    governance: () => import('./viz/governance-matrix') as Promise<{ default: VizRenderer }>,
    reactflow: () => import('./viz/reactflow') as Promise<{ default: VizRenderer }>,
  };

  const load = loaders[vizKey];
  if (!load) return;

  const mod = await load();
  const render = mod.default;
  if (vizKey === 'timeline' && mount.svg) return render({ mountEl: mount.svg, legendEl: mount.legend, props });
  if (vizKey === 'bubbles' && mount.svg) return render({ mountEl: mount.svg, props });
  if (vizKey === 'sem' && mount.svg) return render({ mountEl: mount.svg, props });
  if (vizKey === 'scatter' && mount.svg) return render({ mountEl: mount.svg, panelEl, props });
  if (vizKey === 'matrix' && mount.svg) return render({ mountEl: mount.svg, props });
  if (vizKey === 'bars' && mount.svg) return render({ mountEl: mount.svg, props });
  if (vizKey === 'map' && mount.div) return render({ mountEl: mount.div, props });
  if (vizKey === 'market' && mount.svg) return render({ mountEl: mount.svg, panelEl, props });
  if (vizKey === 'equation' && mount.svg) return render({ mountEl: mount.svg, props });
  if (vizKey === 'dualmap' && mount.div) return render({ mountEl: mount.div, props });
  if (vizKey === 'accuracy' && mount.svg) return render({ mountEl: mount.svg, props });
  if (vizKey === 'precision' && mount.svg) return render({ mountEl: mount.svg, panelEl, props });
  if (vizKey === 'sentiment' && mount.svg) return render({ mountEl: mount.svg, panelEl, props });
  if (vizKey === 'upgrade' && mount.div) return render({ mountEl: mount.div, panelEl, props });
  if (vizKey === 'flow' && mount.svg) return render({ mountEl: mount.svg, panelEl, props });
  if (vizKey === 'governance' && mount.svg) return render({ mountEl: mount.svg, props });
  if (vizKey === 'reactflow' && mount.div) return render({ mountEl: mount.div, panelEl, props });
}

function switchViz(nextVizId: string) {
  const current = document.querySelector<HTMLElement>(".viz-panel.active");
  const next = document.getElementById(nextVizId) as HTMLElement | null;
  if (!next) return;

  const needsInit = panelNeedsInit(next);
  if (current?.id === nextVizId && !needsInit) return;

  if (current && current.id !== nextVizId) {
    current.classList.remove("active");
    current.classList.add("exiting");
    setTimeout(() => current.classList.remove("exiting"), 900);
  }

  next.classList.add("active");

  if (needsInit) {
    vizInitialized[nextVizId] = true;
    void initViz(next);
  }
}

function initCounters() {
  const counters = document.querySelectorAll<HTMLElement>(".stat-num");
  if (!("IntersectionObserver" in window)) return;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target as HTMLElement);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((c) => counterObserver.observe(c));

  function animateCounter(el: HTMLElement) {
    const target = +(el as any).dataset.target;
    const duration = 1800;
    const start = performance.now();
    function update(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      el.textContent = Math.floor(ease * target).toLocaleString();
      if (t < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(update);
  }
}

function initMobileViz(sections: Array<{ textId: string; vizId: string; navIndex: number }>) {
  document.querySelectorAll<HTMLElement>(".mob-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const vizId = tab.dataset.viz || "";
      const section = sections.find((s) => s.vizId === vizId);
      if (!section) return;
      const sectionEl = document.getElementById(section.textId);
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#" + section.textId);
      }
      syncMobileTab(vizId);
      switchViz(vizId);
    });
  });

  const vizColumn = document.getElementById("viz-column");
  const toggleBtn = document.getElementById("viz-toggle");
  if (toggleBtn && vizColumn) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isCollapsing = !vizColumn.classList.contains("viz-collapsed");
      vizColumn.classList.toggle("viz-collapsed");
      const container = document.getElementById("viz-panels-container");
      if (!container) return;
      if (isCollapsing) {
        (container as HTMLElement).style.height = "0";
        (container as HTMLElement).style.minHeight = "0";
        return;
      }

      const key = (document.getElementById("viz-sticky") as HTMLElement | null)?.dataset.storageKey || "scrolly-viz-h";
      try {
        const saved = parseInt(localStorage.getItem(key) || "", 10);
        if (!isNaN(saved)) {
          (container as HTMLElement).style.height = saved + "px";
          (container as HTMLElement).style.minHeight = saved + "px";
        } else {
          (container as HTMLElement).style.height = "";
          (container as HTMLElement).style.minHeight = "";
        }
      } catch (_) {
        (container as HTMLElement).style.height = "";
        (container as HTMLElement).style.minHeight = "";
      }
    });
  }
}

function initVizResize() {
  const handle = document.getElementById("viz-resize-handle");
  const container = document.getElementById("viz-panels-container") as HTMLElement | null;
  if (!handle || !container) return;
  const handleEl = handle as HTMLElement;
  const containerEl = container as HTMLElement;

  if (!isMobile()) {
    containerEl.style.height = "";
    containerEl.style.minHeight = "";
    containerEl.style.transition = "";
    return;
  }

  const VIZ_MIN_H = 300;
  const VIZ_MAX_RATIO = 0.7;
  const key = (document.getElementById("viz-sticky") as HTMLElement | null)?.dataset.storageKey || "scrolly-viz-h";

  let dragging = false;
  let startY = 0;
  let startH = 0;

  function clamp(h: number) {
    return Math.min(Math.round(window.innerHeight * VIZ_MAX_RATIO), Math.max(VIZ_MIN_H, h));
  }

  function applyHeight(h: number, animate: boolean) {
    containerEl.style.transition = animate ? "" : "none";
    containerEl.style.height = h + "px";
    containerEl.style.minHeight = h + "px";
  }

  try {
    const saved = parseInt(localStorage.getItem(key) || "", 10);
    if (!isNaN(saved)) applyHeight(clamp(saved), false);
  } catch (_) { }

  handle.addEventListener("pointerdown", (e) => {
    dragging = true;
    startY = (e as PointerEvent).clientY;
    startH = containerEl.offsetHeight;
    handleEl.setPointerCapture((e as PointerEvent).pointerId);
    handleEl.classList.add("is-dragging");
    applyHeight(startH, false);
    e.preventDefault();
  });

  handle.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    applyHeight(clamp(startH + (e as PointerEvent).clientY - startY), false);
  });

  function onDragEnd() {
    if (!dragging) return;
    dragging = false;
    handleEl.classList.remove("is-dragging");
    containerEl.style.transition = "";
    try {
      localStorage.setItem(key, String(containerEl.offsetHeight));
    } catch (_) { }
  }

  handle.addEventListener("pointerup", onDragEnd);
  handle.addEventListener("pointercancel", onDragEnd);
}

function initScrollTracking(sections: Array<{ textId: string; vizId: string; navIndex: number }>) {
  const progress = document.getElementById("progress-bar");
  const nav = document.getElementById("main-nav");

  function getStickyOffset() {
    const viz = document.getElementById("viz-column")?.offsetHeight || 300;
    return viz;
  }

  let lastActiveSectionId: string | null = null;

  function updateActiveSectionMobile() {
    const stickyH = getStickyOffset();
    const readingTop = window.scrollY + stickyH;
    const readingBottom = window.scrollY + window.innerHeight;
    const activeLine = readingTop + (readingBottom - readingTop) * 0.3;

    let active = window.scrollY >= stickyH * 0.25 ? sections[0] : null;

    for (const s of sections) {
      const el = document.getElementById(s.textId);
      if (!el) continue;
      const absTop = el.getBoundingClientRect().top + window.scrollY;
      if (absTop <= activeLine) active = s;
      else break;
    }

    if (!active || active.textId === lastActiveSectionId) return;
    lastActiveSectionId = active.textId;

    sections.forEach((s) => {
      const el = document.getElementById(s.textId);
      if (el) el.classList.toggle("is-active", s.textId === active.textId);
    });

    switchViz(active.vizId);
    syncMobileTab(active.vizId);
    updateNavDots(active.navIndex);
    updateHash(active.textId);
  }

  const observerOptions = { root: null, rootMargin: "-10% 0px -50% 0px", threshold: 0 };
  const observer = new IntersectionObserver((entries) => {
    if (isMobile()) return;
    entries.forEach((entry) => {
      const section = sections.find((s) => s.textId === (entry.target as HTMLElement).id);
      if (!section) return;
      const textEl = document.getElementById(section.textId);
      if (entry.isIntersecting) {
        textEl?.classList.add("is-active");
        switchViz(section.vizId);
        updateNavDots(section.navIndex);
        updateHash(section.textId);
      } else {
        textEl?.classList.remove("is-active");
      }
    });
  }, observerOptions);

  sections.forEach((s) => {
    const el = document.getElementById(s.textId);
    if (el) observer.observe(el);
  });

  window.addEventListener(
    "scroll",
    () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = (scrolled / total) * 100 + "%";
      nav?.classList.toggle("scrolled", scrolled > 80);
      if (isMobile()) updateActiveSectionMobile();
    },
    { passive: true },
  );

  if (!isMobile()) lastActiveSectionId = sections[0]?.textId || null;

  if (isMobile()) updateActiveSectionMobile();
}

export default function initScrolly() {
  const initialHash = window.location.hash;
  allowHashWrite = false;

  if (typeof history !== "undefined" && "scrollRestoration" in history) {
    if (window.innerWidth <= 900) history.scrollRestoration = "manual";
  }

  const sections = getSections();
  if (!sections.length) return;

  initCounters();
  initMobileViz(sections);
  initVizResize();
  initScrollTracking(sections);
  initKeyboardNav(sections);

  if (isMobile() && !initialHash) {
    window.scrollTo({ top: 0, behavior: "auto" });
    setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
    syncMobileTab(sections[0].vizId);
  }

  if (isMobile() && initialHash) {
    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const targetId = initialHash.slice(1);
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;
        const vizCol = document.getElementById("viz-column");
        const stickyH = vizCol ? vizCol.offsetHeight : 0;
        const absTop = targetEl.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: Math.max(0, absTop - stickyH), behavior: "auto" });

        const matched = sections.find((s) => s.textId === targetId);
        if (matched) {
          switchViz(matched.vizId);
          syncMobileTab(matched.vizId);
          updateNavDots(matched.navIndex);
        }
      });
    });
  }

  requestAnimationFrame(() => {
    allowHashWrite = true;
  });
}
