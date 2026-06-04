# Supabase setup for Nissi

This connects accounts, profiles, addresses, orders and the synced wishlist.
You only need to do this once.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**.
2. Pick a name (e.g. `nissi`), a strong database password, and a region close to
   your users (e.g. **Mumbai / ap-south-1** for India).
3. Wait ~2 minutes for it to provision.

## 2. Add your keys to `.env.local`

In the dashboard go to **Settings → API** and copy:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **Project API keys → `anon` / `public`** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Edit `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚠️ Restart the dev server after editing env vars (`Ctrl+C`, then `npm run dev`).
> The `anon` key is safe for the browser — it's protected by Row Level Security.
> Never put the `service_role` key in `NEXT_PUBLIC_*`.

## 3. Create the database tables

1. In the dashboard open **SQL Editor → New query**.
2. Paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql).
3. Click **Run**.

This creates `profiles`, `addresses`, `orders`, `order_items`, `wishlist`,
turns on Row Level Security (each user only sees their own rows), adds a trigger
that auto-creates a profile on signup, and creates a public **`avatars`** storage
bucket for profile photos.

## 4. Configure auth URLs

**Authentication → URL Configuration:**

- **Site URL:** `http://localhost:3000`
- **Redirect URLs:** add `http://localhost:3000/auth/confirm`

(When you deploy, add your production domain + `/auth/confirm` here too.)

### Quick local testing (optional)

By default Supabase sends a confirmation email on signup. For fast local testing
you can skip that: **Authentication → Sign In / Providers → Email** → turn **off
"Confirm email"**. Now signups log in immediately. Turn it back on for production.

## 5. Run it

```bash
npm run dev
```

- **Sign up** at `/signup` → a profile row is created automatically.
- **Sign in** at `/login`.
- **Account** at `/account` (Profile · Addresses · Orders · Wishlist), guarded by
  middleware — signed-out visitors are redirected to `/login`.
- Hearts on product cards now save to your account and sync across devices
  (they fall back to `localStorage` when signed out, and merge in on sign-in).

## What's wired vs. what's next

| Area | Status |
| --- | --- |
| Email/password auth, session refresh, route guard | ✅ done |
| Profile (name, phone, avatar upload to Storage) | ✅ done |
| Shipping addresses (CRUD, default address) | ✅ done |
| Wishlist sync (DB when signed in, local otherwise) | ✅ done |
| Orders page + schema | ✅ reads real orders; none are created yet |
| Checkout → creating orders / payments | ⛔ not wired (demo) |

To start writing real orders, insert into `orders` + `order_items` at checkout
(e.g. from a server action after a Razorpay/Stripe payment succeeds) — the schema
and RLS are already in place.
