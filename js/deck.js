// Cassette deck + SoundCloud widget wiring.
// Swap MIX_URL when a new mix drops — everything else adapts.
const MIX_URL = 'https://soundcloud.com/livius-live/house-to-techno';
const AUTO_PLAY = true; // party-landing mode: start on load where allowed, else on first touch

export function initDeck() {
  const slot = document.getElementById('sc-slot');
  const deck = document.getElementById('deck');

  if (!MIX_URL) {
    const ph = document.createElement('div');
    ph.className = 'sc-placeholder';
    ph.append('MIX 001 — ON THE WAY', document.createElement('br'));
    const sub = document.createElement('span');
    sub.textContent = 'pure bangers · no skips';
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
    `&color=%23ff2d95&auto_play=${AUTO_PLAY}&hide_related=true&show_comments=false&show_user=true&visual=false`;
  slot.append(iframe);

  const api = document.createElement('script');
  api.src = 'https://w.soundcloud.com/player/api.js';
  api.onload = () => {
    const wg = SC.Widget(iframe);
    let started = false;
    wg.bind(SC.Widget.Events.PLAY, () => { started = true; deck.classList.add('playing'); });
    wg.bind(SC.Widget.Events.PAUSE, () => deck.classList.remove('playing'));
    wg.bind(SC.Widget.Events.FINISH, () => deck.classList.remove('playing'));
    if (AUTO_PLAY) {
      // Browsers block audible autoplay until the visitor interacts — so the
      // widget tries on load (works where the site has autoplay rights), and
      // the very first touch/click/keypress anywhere starts the music otherwise.
      wg.bind(SC.Widget.Events.READY, () => { if (!started) wg.play(); });
      const kick = () => {
        if (!started) wg.play();
        removeEventListener('pointerdown', kick, true);
        removeEventListener('keydown', kick, true);
      };
      addEventListener('pointerdown', kick, true);
      addEventListener('keydown', kick, true);
    }
  };
  document.head.appendChild(api);
}
