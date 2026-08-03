# L3X / Ladies Luv Livius — page kit

Hi! This is a ready-to-use upgrade kit for **theblockorlando.com/l3x**, built to match
the "Ladies Luv Livius" synthwave banner already on the page. Live reference of the
full look: **https://lildaddy850.github.io/l3x-page/**

Everything here is plug-and-play — two levels, use either or both.

## Level 1 — no code (10 minutes)

1. **Animated background**: in the Wix editor, select the page's main strip →
   Change Section Background → Video → Upload → use `hero-loop.mp4` (16:9).
   It's a seamless loop of the animated sunset laser-grid.
   `hero-loop-vertical.mp4` (9:16) is included for the mobile editor background.
2. **Slideshow graphics**: add the PNGs in `graphics/` to the slideshow —
   `deal-1/2/3.png` (1080×1350) and `still-1/2/3.png` (1920×1080). They're the same
   visual system as the site, sized for feed + widescreen slots.
3. **Music player**: Add → Video & Music → SoundCloud, paste the mix URL
   (Ed will send the final MIX 001 link).
4. `graphics/og.png` (1200×630) works as the page's social-share image if you want
   link previews to show the branded artwork.

## Level 2 — one paste (the full glow-up)

`restyle.js` restyles the existing page live: swaps the text into the matching
display fonts, adds the neon glow, and puts a subtle animated laser-grid + scanline
atmosphere behind the content. Nothing about the page's layout, links, or content
changes.

1. Wix dashboard → **Settings → Custom Code → + Add Custom Code**
2. Paste the entire contents of `restyle.js`
3. Name it "L3X restyle", set **Load code on: Choose specific pages → the L3X page**,
   place it in **Body — end**
4. Save. Done.

Safety notes: the script only ever runs on the /l3x page, it's wrapped so any error
falls back to the stock page, and deleting that one snippet instantly restores
everything. It respects visitors' reduced-motion settings.

## Small things we noticed (free fixes)

- The accessibility email in the site footer reads `director@thebockorlando.com` —
  missing the "l" in "theblock", so mail to it bounces.
- The footer TERMS link doesn't point anywhere at the moment.
- The page title tag says "LATINAS LOVE LIVIUS" while the banner art says
  "LADIES LUV LIVIUS" — either is fine, just flagging in case one is preferred.

## Credits

Video by **LIVE VIDEOS** · Graphics + site by **LIVIUSLIVE** (@liviuslive)
Questions: liviusbooking@gmail.com
