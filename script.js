// ---- EDIT YOUR PROJECTS HERE ----
const PROJECTS = [
  { title:"Microsite — On Borrowed Fabric", role:"Design · 2024", img:"images/project1.jpg", url:"#"},
  { title:"Composite I-Beam Study",        role:"Materials · 2023", img:"images/project2.jpg", url:"#"},
  // add more; empty slots will show as placeholders
];

// ---- GRID SETTINGS (keep in sync with CSS) ----
const COLS = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cols')) || 4;
const ROWS = 2; // choose how many rows you want visible in the grid
const totalSlots = COLS * ROWS;

// ---- RENDER ----
const items = [...PROJECTS];
while (items.length < totalSlots) items.push(null); // placeholders

const $grid  = document.getElementById('grid');
const $count = document.getElementById('count');

items.slice(0, totalSlots).forEach(p => {
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
  $grid.appendChild(el);
});

if ($count) $count.textContent = `${PROJECTS.length} projects`;

// keep page non-scrolling
document.body.style.overflow = 'hidden';
