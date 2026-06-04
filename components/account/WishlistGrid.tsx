"use client";

import Link from "next/link";
import { Heart, Loader2 } from "lucide-react";
import { products } from "@/lib/data";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import ProductCard from "@/components/ProductCard";

export default function WishlistGrid() {
  const { ids, ready } = useWishlist();

  if (!ready) {
    return (
      <div className="flex justify-center py-16 text-olive">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const items = products.filter((p) => ids.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 border border-dashed border-charcoal/20 py-16 text-center">
        <Heart className="h-10 w-10 text-olive" strokeWidth={1} />
        <p className="font-serif text-2xl font-light">Your wishlist is empty</p>
        <p className="max-w-xs text-sm font-light text-charcoal-soft">
          Tap the heart on any piece to save it here — it&apos;ll follow you across
          devices.
        </p>
        <Link href="/#new-arrivals" className="btn-primary mt-2">
          Explore Pieces
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 lg:gap-x-6">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
