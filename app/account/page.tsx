import Link from "next/link";
import { Heart, MapPin, Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AccountOverviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Counts for the dashboard cards (head-only queries are cheap).
  const [orders, addresses, wishlist] = await Promise.all([
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase.from("addresses").select("id", { count: "exact", head: true }),
    supabase.from("wishlist").select("product_id", { count: "exact", head: true }),
  ]);

  const cards = [
    {
      label: "Orders",
      count: orders.count ?? 0,
      href: "/account/orders",
      icon: Package,
      blurb: "Track and review your past orders.",
    },
    {
      label: "Saved Addresses",
      count: addresses.count ?? 0,
      href: "/account/addresses",
      icon: MapPin,
      blurb: "Manage where your pieces are delivered.",
    },
    {
      label: "Wishlist",
      count: wishlist.count ?? 0,
      href: "/account/wishlist",
      icon: Heart,
      blurb: "The pieces you're saving for later.",
    },
  ];

  return (
    <div>
      <p className="text-base font-light leading-relaxed text-charcoal-soft">
        Welcome back{user?.email ? "" : ""}. From here you can manage your profile,
        addresses, orders and saved pieces.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map(({ label, count, href, icon: Icon, blurb }) => (
          <Link
            key={label}
            href={href}
            className="group border border-charcoal/10 bg-beige/30 p-6 transition-colors hover:border-charcoal/30"
          >
            <div className="flex items-center justify-between">
              <Icon className="h-5 w-5 text-olive" strokeWidth={1.5} />
              <span className="font-serif text-3xl text-charcoal">{count}</span>
            </div>
            <p className="mt-4 text-[12px] uppercase tracking-wide2 text-charcoal">
              {label}
            </p>
            <p className="mt-1 text-sm font-light text-charcoal-soft">{blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
