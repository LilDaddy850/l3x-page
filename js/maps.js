// Directions chooser — one tap opens a picker for Apple Maps / Google Maps / Waze.
const ADDR = '54 N Orange Ave, Orlando, FL 32801';
const APPS = [
  { name: 'Apple Maps', url: 'https://maps.apple.com/?daddr=' + encodeURIComponent(ADDR) },
  { name: 'Google Maps', url: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(ADDR) },
  { name: 'Waze', url: 'https://waze.com/ul?q=' + encodeURIComponent(ADDR) + '&navigate=yes' },
];

export function initMapsSheet() {
  const sheet = document.getElementById('maps-sheet');
  if (!sheet) return;
  const list = sheet.querySelector('.ms-list');

  APPS.forEach(({ name, url }) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = name;
    a.addEventListener('click', close);
    list.append(a);
  });

  function open(e) {
    e.preventDefault();
    sheet.hidden = false;
    requestAnimationFrame(() => sheet.classList.add('open'));
  }
  function close() {
    sheet.classList.remove('open');
    setTimeout(() => { sheet.hidden = true; }, 250);
  }

  document.querySelectorAll('[data-directions]').forEach((btn) => btn.addEventListener('click', open));
  sheet.querySelector('.ms-backdrop').addEventListener('click', close);
  sheet.querySelector('.ms-cancel').addEventListener('click', close);
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) close(); });
}
