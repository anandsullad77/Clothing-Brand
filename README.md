# Nissi

A premium, conversion-focused single-page fashion ecommerce landing page for a
fictional vintage-inspired women's clothing brand, **Nissi** — _"Timeless
pieces for modern romantics."_

Built to feel closer to a fashion editorial than a typical store: generous
whitespace, large photography, serif display type, and soft, intentional motion.

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS 3**
- **Framer Motion** (scroll reveals, parallax hero, marquee, carousel, micro-interactions)
- **Lucide** icons
- **next/font** — Cormorant Garamond (display) + Inter (body)
- **Supabase** (`@supabase/ssr`) — auth, profiles, addresses, orders, wishlist sync

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

> **Accounts:** sign-up/login, profile, addresses, order history and a synced
> wishlist run on Supabase. They need a Supabase project + keys to function —
> see **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)**. The rest of the storefront
> works without it.

```bash
npm run build && npm run start   # production
```

> Images use high-quality Unsplash fashion photography as placeholders. The
> `images.unsplash.com` host is allow-listed in `next.config.ts`.

## Structure

```
app/
  layout.tsx        # fonts, metadata, SEO, skip link
  page.tsx          # section composition + JSON-LD
  globals.css       # design tokens, utilities, reduced-motion
components/          # Navbar, Hero, CategoryCard, ProductCard,
                    # TestimonialCard, JournalCard, Footer, …
lib/
  data.ts           # mock products, categories, testimonials, articles
  animations.ts     # shared Framer Motion variants + easing
```

## Sections

Announcement bar · Navigation (transparent → sticky) · Editorial hero (parallax) ·
Featured categories · Autumn Atelier story · Best sellers · Brand values ·
Testimonials carousel · Journal · Instagram gallery · Newsletter · Footer.

## Design tokens

| Token    | Hex       | Use                |
| -------- | --------- | ------------------ |
| ivory    | `#F8F5F0` | Base background    |
| beige    | `#E8DDD0` | Sections / cards   |
| charcoal | `#2D2A26` | Text / dark blocks |
| olive    | `#8C907A` | Muted accents      |
| gold     | `#C8A97E` | Highlights / CTAs  |

## Notes

- Accessible: semantic landmarks, skip link, focus-visible rings, `aria` labels,
  `prefers-reduced-motion` support, keyboard-operable controls.
- Mobile-first and fully responsive (drawer nav, fluid grids).
- All product data is mock data — wire `lib/data.ts` and the newsletter/cart
  handlers to a real backend / ESP for production.
