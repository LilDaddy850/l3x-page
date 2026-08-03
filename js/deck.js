// Cassette deck + SoundCloud widget wiring.
const MIX_URL = null; // ← paste Ed's SoundCloud track URL here when MIX 001 is up

export function initDeck() {
  const slot = document.getElementById('sc-slot');
  const deck = document.getElementById('deck');

  if (!MIX_URL) {
    const ph = document.createElement('div');
    ph.className = 'sc-placeholder';
    ph.append('MIX 001 — IN THE LAB · DROPS THIS WEEK', document.createElement('br'));
    const sub = document.createElement('span');
    sub.textContent = 'recorded live from the Thursday room';
    ph.append(sub);
    slot.append(ph);
    return;
  }

  const iframe = document.createElement('iframe');
  iframe.title = 'Ladies Luv Livius Mix';
  iframe.width = '100%';
  iframe.height = '120';
  iframe.allow = 'autoplay';
  iframe.setAttribute('frameborder', 'no');
  iframe.src =
    'https://w.soundcloud.com/player/?url=' +
    encodeURIComponent(MIX_URL) +
    '&color=%23ff2d95&hide_related=true&show_comments=false&show_user=true&visual=false';
  slot.append(iframe);

  const api = document.createElement('script');
  api.src = 'https://w.soundcloud.com/player/api.js';
  api.onload = () => {
    const wg = SC.Widget(iframe);
    wg.bind(SC.Widget.Events.PLAY, () => deck.classList.add('playing'));
    wg.bind(SC.Widget.Events.PAUSE, () => deck.classList.remove('playing'));
    wg.bind(SC.Widget.Events.FINISH, () => deck.classList.remove('playing'));
  };
  document.head.appendChild(api);
}
