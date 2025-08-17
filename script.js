/* ---------- Base path that works on user sites (/) and project sites (/repo/) ---------- */
const BASE = (() => {
  const parts = location.pathname.split('/').filter(Boolean);
  return parts.length ? `/${parts[0]}/` : '/';
})();

/* ---------- Footer year everywhere ---------- */
(() => {
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ---------- Projects (home) grid ---------- */
(() => {
  const grid = document.getElementById('grid');
  if (!grid) return; // not the Projects page

  const count = document.getElementById('count');

  const PROJECTS = [
    { title: "Microsite — On Borrowed Fabric", role: "Design · 2024",   img: `${BASE}images/project1.jpg`, url: "#" },
    { title: "Composite I-Beam Study",          role: "Materials · 2023", img: `${BASE}images/project2.jpg`, url: "#" },
    // If you want your modeling image to also appear on Projects, uncomment:
    // { title: "Modeling — FK6A9868", role: "Modeling", img: `${BASE}images/FK6A9868.JPG`, url: "#" },
  ];

  const styles = getComputedStyle(document.documentElement);
  const COLS = parseInt(styles.getPropertyValue('--cols')) || 4;
  const ROWS = 2;                    // keep the card layout tidy
  const TOTAL = COLS * ROWS;

  const items = [...PROJECTS];
  while (items.length < TOTAL) items.push(null);

  items.slice(0, TOTAL).forEach(p => {
    const tag = p ? 'a' : 'div';
    const el = document.createElement(tag);
    el.className = 'tile';
    if (p?.url) { el.href = p.url; el.target = '_blank'; el.rel = 'noreferrer'; }
    el.innerHTML = `
      <div class="meta">
        <div class="t">${p?.title || 'Empty slot'}</div>
        <div class="k">${p?.role || 'Add project'}</div>
      </div>
      <div class="thumb">${p?.img ? `<img src="${p.img}" alt="">` : '—'}</div>
      <div class="cta">${p ? 'view →' : 'slot'}</div>
    `;
    grid.appendChild(el);
  });

  if (count) count.textContent = `${PROJECTS.length} project${PROJECTS.length === 1 ? '' : 's'}`;
})();

/* ---------- Modeling gallery (fixed 7 × 5 = 35 tiles, images only) ---------- */
(() => {
  const gallery = document.getElementById('gallery');
  if (!gallery) return; // only run when a gallery exists
  if (!document.body.classList.contains('modeling')) return; // run on Modeling page only

  const TOTAL_TILES = 35;
  const IMAGES = [
    `${BASE}images/FK6A9868.JPG`,  // <-- your uploaded image (exact case)
    // add more like: `${BASE}images/another.JPG`,
  ];

  // in case something pre-populated it, start clean
  if (gallery.children.length) gallery.innerHTML = '';

  for (let i = 0; i < TOTAL_TILES; i++) {
    const el = document.createElement('div');
    el.className = 'tile';

    const src = IMAGES[i];
    if (src) {
      const img = new Image();
      img.alt = '';
      img.src = src;
      el.appendChild(img);
    }

    gallery.appendChild(el);
  }
})();
