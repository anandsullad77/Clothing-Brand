import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/currency";
import type { Order } from "@/lib/supabase/types";

const statusStyles: Record<string, string> = {
  pending: "bg-beige text-charcoal",
  confirmed: "bg-olive/20 text-olive",
  shipped: "bg-gold/20 text-gold",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-700",
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const orders = (data as Order[]) ?? [];

  return (
    <div>
      <h2 className="font-serif text-2xl font-light text-charcoal">Order history</h2>
      <p className="mt-1 text-sm font-light text-charcoal-soft">
        Review and track your Nissi orders.
      </p>

      {orders.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 border border-dashed border-charcoal/20 py-16 text-center">
          <Package className="h-10 w-10 text-olive" strokeWidth={1} />
          <p className="font-serif text-2xl font-light">No orders yet</p>
          <p className="max-w-xs text-sm font-light text-charcoal-soft">
            When you place an order it will appear here, ready to track.
          </p>
          <Link href="/#new-arrivals" className="btn-primary mt-2">
            Start Shopping
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-5">
          {orders.map((order) => (
            <li key={order.id} className="border border-charcoal/10">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal/10 bg-beige/20 px-5 py-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wide2 text-olive">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="mt-0.5 text-sm text-charcoal-soft">
                    {new Date(order.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 text-[10px] uppercase tracking-wide2 ${
                      statusStyles[order.status] ?? "bg-beige text-charcoal"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="font-serif text-lg">{formatPrice(order.total)}</span>
                </div>
              </div>
              <ul className="divide-y divide-charcoal/5 px-5">
                {(order.order_items ?? []).map((item) => (
                  <li key={item.id} className="flex items-center gap-4 py-4">
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-beige">
                      <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-serif text-base">{item.name}</p>
                      <p className="text-[12px] uppercase tracking-wide2 text-olive">
                        Size {item.size} · Qty {item.qty}
                      </p>
                    </div>
                    <p className="font-serif text-base">{formatPrice(item.price * item.qty)}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
