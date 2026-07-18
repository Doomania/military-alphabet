# Military Communication Reference

Complete interactive military communication reference — built for cybersecurity analysts, emergency responders, pilots, ham radio operators, and anyone who needs clear voice communication.

🔗 **https://military-alphabet.pages.dev** (canonical) · mirror: https://doomania.github.io/military-alphabet

---

## Pages

| Page | URL | What's inside |
|------|-----|---------------|
| **Home** | `/` | Hub — links to all tools |
| **NATO Alphabet** | `/alphabet.html` | 26 codewords, pronunciation, origin, text converter |
| **Morse Code** | `/morse.html` | Encode, decode, live audio playback, A–Z and 0–9 |
| **Military Time** | `/military-time.html` | Live Zulu clock, Zulu to any timezone, 12-hr converter, world zones |
| **Police Codes** | `/codes.html` | 10-codes, status codes, penal codes, prowords, tactical phrases |
| **Ham Radio** | `/ham-radio.html` | Q-codes, abbreviations, HF band plan, RST, NZ callsigns |
| **Signal Flags** | `/signal-flags.html` | ICS nautical flags A–Z with SVG visuals and maritime meanings |
| **Drill** | `/drill.html` | Randomised quiz — NATO, Morse, military time, police codes, ham radio |

---

## Features

- Responsive nav — sticky top bar on desktop, hamburger + bottom nav on mobile
- Auto-detects user timezone for Zulu converter
- Live ticking clocks (Zulu + local)
- Morse audio via Web Audio API (adjustable speed)
- Searchable codes page — filters all 130+ codes in real time
- Drill mode with streak counter and score percentage
- ICS signal flags rendered as pure SVG — no image files needed
- Installable PWA — works offline after first load
- Google Analytics — per-page traffic tracking
- SEO — unique title, description, canonical URL per page
- Accessibility — aria labels, skip links, screen reader support
- CC BY-NC 4.0 licensed

---

## Tech

- 8 standalone HTML files — no framework, no build step, no dependencies
- Vanilla JS + CSS only
- Shared design system via inline CSS and JS across all pages
- Service worker for offline PWA caching
- Morse audio via Web Audio API
- Timezone detection via Intl API

---

## File Structure

```
military-alphabet/
├── index.html           Hub homepage
├── alphabet.html        NATO phonetic alphabet
├── morse.html           Morse code
├── military-time.html   Military time + Zulu converter
├── codes.html           Police codes + prowords
├── ham-radio.html       Ham radio Q-codes
├── signal-flags.html    ICS signal flags
├── drill.html           Quiz drill mode
├── 404.html             Custom not found page
├── sw.js                Service worker (offline PWA)
├── manifest.json        PWA install manifest
├── sitemap.xml          SEO sitemap (all 8 pages)
├── robots.txt           Search engine crawl rules
├── _config.yml          Jekyll / GitHub Pages config
└── LICENSE              CC BY-NC 4.0
```

---

## License

[![CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

© 2025 doomania. Licensed under [Creative Commons Attribution-NonCommercial 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

Free to share and adapt with credit. **Commercial use requires written permission.**
