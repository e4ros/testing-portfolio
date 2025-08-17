/* ===== Footer year (all pages) ===== */
(() => {
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ===== Fixed 7×5 gallery on any page that has #gallery ===== */
(() => {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  const TOTAL = 35; // 7 columns × 5 rows, fixed

  // Base for GitHub Project Pages, e.g. /testing-portfolio/
  const ROOT = (() => {
    const parts = location.pathname.split('/').filter(Boolean);
    return parts.length ? `/${parts[0]}/` : '/';
  })();

  // For each slot, provide a list of candidate URLs; loader will use the first that exists
  const IMAGES = [
    // Slot 0 — your photo, try repo root and /images/, with JPG/jpg
    [
      `${ROOT}FK6A9868.JPG`,
      `${ROOT}FK6A9868.jpg`,
      `${ROOT}images/FK6A9868.JPG`,
      `${ROOT}images/FK6A9868.jpg`,
    ],
    // Add more images as arrays of candidates if you like:
    // [ `${ROOT}images/another.JPG`, `${ROOT}another.JPG` ],
  ];

  // Build exactly 35 tiles
  for (let i = 0; i < TOTAL; i++) {
    const el = document.createElement('div');
    el.className = 'tile';

    const candidates = IMAGES[i];
    if (Array.isArray(candidates) && candidates.length) {
      // Try candidates until one loads
      let idx = 0;
      const img = new Image();
      img.alt = '';
      img.onerror = () => {
        idx += 1;
        if (idx < candidates.length) {
          img.src = candidates[idx];
        }
        // if all fail, we leave the tile as the subtle pattern
      };
      img.onload = () => { el.appendChild(img); };
      img.src = candidates[idx];
    }

    gallery.appendChild(el);
  }
})();
