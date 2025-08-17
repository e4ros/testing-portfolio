<script>
/* === Source items (add images/links if you have them) === */
const PROJECTS = [
  { img:"images/project1.jpg", url:"#", title:"Microsite — On Borrowed Fabric" },
  { img:"images/project2.jpg", url:"#", title:"Composite I-Beam Study" },
  // add more here...
];

/* === Compute rows/cols to target ~20–30 tiles === */
(function fitGrid(){
  const headerH = 68;  // from CSS
  const footerH = 40;  // from CSS
  const mainPad = 20;  // main has ~10px top/bottom padding
  const gap = 12;      // --gap

  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const usableW = vw - 40; // some margins
  const usableH = vh - headerH - footerH - mainPad;

  // aim for roughly square tiles around 140–180 px
  const ideal = 160;
  let cols = Math.max(2, Math.floor((usableW + gap) / (ideal + gap)));
  let rows = Math.max(3, Math.floor((usableH + gap) / (ideal + gap)));

  // clamp to land between 20–30 total tiles
  function clampTiles(r, c){
    let total = r * c;
    if (total < 20){
      // try to increase the more constrained dimension first
      if ((usableH / r) < (usableW / c)) r++;
      else c++;
      return clampTiles(r, c);
    }
    if (total > 30){
      if (r > c && r > 3) r--;
      else if (c > 2) c--;
      else return [r, c];
      return clampTiles(r, c);
    }
    return [r, c];
  }
  [rows, cols] = clampTiles(rows, cols);

  document.documentElement.style.setProperty('--rows', rows);
  document.documentElement.style.setProperty('--cols', cols);

  // build tiles
  const $g = document.getElementById('gallery');
  $g.innerHTML = '';

  const total = rows * cols;
  const items = [...PROJECTS];
  while (items.length < total) items.push(null);

  items.slice(0, total).forEach(p => {
    const tag = p?.url ? 'a' : 'div';
    const el = document.createElement(tag);
    el.className = 'tile';
    if (p?.url){ el.href = p.url; el.target = '_blank'; el.rel = 'noreferrer'; }
    el.innerHTML = p?.img ? `<img src="${p.img}" alt="">` : '—';
    $g.appendChild(el);
  });
})();

// Recalculate on resize so you always stay in the 20–30 range
addEventListener('resize', () => { location.reload(); });
document.getElementById('y')?.textContent = new Date().getFullYear();
</script>
