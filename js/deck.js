// Cassette deck — custom VHS transport driving a hidden SoundCloud widget.
// SoundCloud does the playing (and keeps the link + download); our controls keep the look.
// Swap MIX_URL when a new mix drops — everything else adapts.
const MIX_URL = 'https://soundcloud.com/livius-live/house-to-techno';
const AUTO_PLAY = true; // party-landing mode: start on load where allowed, else on first touch

function fmt(ms) {
  const s = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(s / 60);
  return String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}

export function initDeck() {
  const slot = document.getElementById('sc-slot');
  const deck = document.getElementById('deck');
  const transport = document.getElementById('transport');
  const pill = document.getElementById('sound-pill');

  if (!MIX_URL) {
    transport.hidden = true;
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
  iframe.title = 'Ladies Luv Livius Mix (SoundCloud)';
  iframe.className = 'sc-hidden';
  iframe.width = '300';
  iframe.height = '80';
  iframe.allow = 'autoplay';
  iframe.setAttribute('frameborder', 'no');
  iframe.src =
    'https://w.soundcloud.com/player/?url=' +
    encodeURIComponent(MIX_URL) +
    `&auto_play=${AUTO_PLAY}&hide_related=true&show_comments=false&visual=false`;
  slot.append(iframe);

  document.getElementById('t-sc').href = MIX_URL;
  document.getElementById('t-dl').href = MIX_URL + '/download';

  const playBtn = document.getElementById('t-play');
  const stopBtn = document.getElementById('t-stop');
  const rail = document.getElementById('t-rail');
  const fill = document.getElementById('t-fill');
  const posEl = document.getElementById('t-pos');
  const durEl = document.getElementById('t-dur');
  const titleEl = document.getElementById('t-title');

  const api = document.createElement('script');
  api.src = 'https://w.soundcloud.com/player/api.js';
  api.onload = () => {
    const wg = SC.Widget(iframe);
    let started = false;
    let playing = false;
    let duration = 0;

    const showPill = () => { if (AUTO_PLAY && !playing && pill) pill.hidden = false; };
    const hidePill = () => { if (pill) pill.hidden = true; };

    wg.bind(SC.Widget.Events.READY, () => {
      wg.getDuration((d) => { duration = d; durEl.textContent = fmt(d); });
      wg.getCurrentSound((s) => { if (s && s.title) titleEl.textContent = s.title.toUpperCase(); });
      if (AUTO_PLAY && !started) {
        wg.play();
        // if autoplay was blocked (or started-then-paused), invite the tap
        setTimeout(showPill, 900);
        setTimeout(showPill, 2500);
      }
    });
    wg.bind(SC.Widget.Events.PLAY, () => {
      started = true; playing = true;
      deck.classList.add('playing');
      playBtn.setAttribute('aria-label', 'Pause mix');
      hidePill();
    });
    wg.bind(SC.Widget.Events.PAUSE, () => {
      playing = false;
      deck.classList.remove('playing');
      playBtn.setAttribute('aria-label', 'Play mix');
    });
    wg.bind(SC.Widget.Events.FINISH, () => {
      playing = false;
      deck.classList.remove('playing');
      playBtn.setAttribute('aria-label', 'Play mix');
      fill.style.width = '0%';
      posEl.textContent = '00:00';
    });
    wg.bind(SC.Widget.Events.PLAY_PROGRESS, (e) => {
      posEl.textContent = fmt(e.currentPosition);
      if (duration) fill.style.width = ((e.currentPosition / duration) * 100).toFixed(2) + '%';
    });

    playBtn.addEventListener('click', () => (playing ? wg.pause() : wg.play()));
    stopBtn.addEventListener('click', () => {
      wg.pause();
      wg.seekTo(0);
      fill.style.width = '0%';
      posEl.textContent = '00:00';
    });
    rail.addEventListener('click', (ev) => {
      const r = rail.getBoundingClientRect();
      const frac = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width));
      if (duration) wg.seekTo(frac * duration);
    });
    if (pill) pill.addEventListener('click', () => wg.play());

    if (AUTO_PLAY) {
      // Browsers block audible autoplay until the visitor interacts — first
      // touch/click/keypress anywhere starts the music if it couldn't on load.
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
