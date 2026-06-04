"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  User,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/account", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
];

export default function AccountSidebar({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="lg:sticky lg:top-28 lg:h-fit">
      <div className="mb-6 border-b border-charcoal/10 pb-6">
        <p className="text-[11px] uppercase tracking-wide2 text-olive">Signed in as</p>
        <p className="mt-1 font-serif text-xl text-charcoal">{name}</p>
        <p className="truncate text-sm font-light text-charcoal-soft">{email}</p>
      </div>

      <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 whitespace-nowrap px-4 py-3 text-[13px] uppercase tracking-wide2 transition-colors ${
                active
                  ? "bg-charcoal text-ivory"
                  : "text-charcoal hover:bg-beige"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={signOut}
          className="flex items-center gap-3 whitespace-nowrap px-4 py-3 text-left text-[13px] uppercase tracking-wide2 text-charcoal transition-colors hover:bg-beige"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Sign Out
        </button>
      </nav>
    </aside>
  );
}
