# Crystal Maciel — Luxury Nails

Premium single-page website for **Crystal Maciel**, luxury nail artist in San Fernando, CA.
Dark-luxe design (charcoal + champagne/rose gold), fully bilingual (EN/ES), with online booking,
a FAQ chatbot, and a password-protected admin dashboard.

**Live business facts:** 811 San Fernando Rd. Ste. 201, San Fernando, CA 91340 · (747) 214-1272
**Hours:** Tue–Sat 10am–7pm · Sun 11am–5pm · Mon closed (editable in admin)

## Structure

```
crystal-maciel-nails/
├── index.html          # markup only
├── css/style.css       # all styles
├── js/app.js           # all logic (i18n, booking, chatbot, admin, store)
├── assets/             # bundled photography (no external image dependencies)
│   ├── hero.jpg        # hero background
│   ├── about.jpg       # about section
│   └── g-*.jpg         # gallery pieces (6)
└── README.md
```

## Features

- Bilingual EN/ES toggle (complete UI + chatbot translation dictionary)
- Online booking wizard: service → calendar → time slots → details → confirmation (localStorage)
- Floating bilingual FAQ chatbot (rule-based)
- Gallery with lightbox, services menu with prices, testimonials carousel
- **Admin dashboard** at `#/admin` — default password `crystal2026`
  (salted SHA-256 hash in localStorage; change it in Settings after first login).
  Edit content/services/gallery/testimonials, manage bookings, view analytics,
  toggle features on/off. All data persists in the browser's localStorage (client-side demo backend).

## Deploy

**No build step required — this is a pure static site.**

### Option A: Vercel (recommended)
1. Push this folder to a GitHub repo (see below).
2. Go to [vercel.com/new](https://vercel.com/new) → *Import* the repo.
3. Framework preset: **Other**. Build command: _(empty)_. Output directory: `.` (repo root).
4. Deploy. Done — Vercel serves `index.html` automatically.

### Option B: Any static host
Drag-and-drop this folder into Netlify Drop, Cloudflare Pages, GitHub Pages,
or serve it with any static server:
```bash
npx serve .
# or
python3 -m http.server 8080
```

### Push to GitHub
```bash
cd crystal-maciel-nails
git init
git add .
git commit -m "Crystal Maciel luxury nails site"
gh repo create crystal-maciel-nails --public --source=. --push
# then import the repo in Vercel (Option A)
```

## Notes

- Demo-grade backend: bookings/content/analytics live in the visitor's own
  browser localStorage — no cross-device sync. For production, back the booking
  flow with a real API/database.
- External calls at runtime: Google Fonts + Google Maps embed only (graceful fallbacks).
