# L3X / Ladies Luv Livius â€” page kit

Hi! This is a ready-to-use upgrade kit for **theblockorlando.com/l3x**, built to match
the "Ladies Luv Livius" synthwave banner already on the page. Live reference of the
full look: **https://lildaddy850.github.io/l3x-page/**

Everything here is plug-and-play â€” two levels, use either or both.

## Level 1 â€” no code (10 minutes)

1. **Animated background**: in the Wix editor, select the page's main strip â†’
   Change Section Background â†’ Video â†’ Upload â†’ use `hero-loop.mp4` (16:9).
   It's a seamless loop of the animated sunset laser-grid.
   `hero-loop-vertical.mp4` (9:16) is included for the mobile editor background.
2. **Slideshow graphics**: add the PNGs in `graphics/` to the slideshow â€”
   `deal-1/2/3.png` (1080Ã—1350) and `still-1/2/3.png` (1920Ã—1080). They're the same
   visual system as the site, sized for feed + widescreen slots.
3. **Music player**: Add â†’ Video & Music â†’ SoundCloud, paste the mix URL:
   `https://soundcloud.com/livius-live/mix-001-ladies-luv-livius`
   (MIX 001 â€” a 12-minute mix made for the night, cover art matches the page.)
4. **Cleaner footage**: `clips/clip-1.mp4` and `clips/clip-2.mp4` â€” two short, clean
   crowd clips from the night (silent, small files). They work in the slideshow or as
   section backgrounds. A formal commercial is in production and coming separately.
5. `graphics/og.png` (1200Ã—630) works as the page's social-share image if you want
   link previews to show the branded artwork.

## Level 2 â€” one paste (the full glow-up)

`restyle-paste-me.txt` restyles the existing page live: swaps the text into the matching
display fonts, adds the neon glow, and puts a subtle animated laser-grid + scanline
atmosphere behind the content. Nothing about the page's layout, links, or content
changes.

1. Wix dashboard â†’ **Settings â†’ Custom Code â†’ + Add Custom Code**
2. Paste the entire contents of `restyle-paste-me.txt`
3. Name it "L3X restyle", set **Load code on: Choose specific pages â†’ the L3X page**,
   place it in **Body â€” end**
4. Save. Done.

Safety notes: the script only ever runs on the /l3x page, it's wrapped so any error
falls back to the stock page, and deleting that one snippet instantly restores
everything. It respects visitors' reduced-motion settings.

## Small things we noticed (free fixes)

- The accessibility email in the site footer reads `director@thebockorlando.com` â€”
  missing the "l" in "theblock", so mail to it bounces.
- The footer TERMS link doesn't point anywhere at the moment.
- The page title tag says "LATINAS LOVE LIVIUS" while the banner art says
  "LADIES LUV LIVIUS" â€” either is fine, just flagging in case one is preferred.

## Credits

Video by **LIVE VIDEOS** Â· Graphics + site by **LIVIUSLIVE** (@liviuslive)
Questions: liviusbooking@gmail.com
