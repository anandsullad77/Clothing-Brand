"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/currency";
import { fadeUp } from "@/lib/animations";
import { useCart } from "@/components/cart/CartProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const wishlisted = has(product.id);
  const href = `/products/${product.id}`;

  return (
    <motion.article variants={fadeUp} className="group flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige transition-shadow duration-700 ease-silk group-hover:shadow-lift">
        {/* Image links to the product page */}
        <Link href={href} aria-label={`View ${product.name}`} className="absolute inset-0 z-10">
          <span className="sr-only">{product.name}</span>
        </Link>

        {/* Primary image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-opacity duration-700 ease-silk group-hover:opacity-0"
        />
        {/* Secondary image revealed on hover */}
        <Image
          src={product.hoverImage}
          alt={`${product.name} — alternate view`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="scale-105 object-cover opacity-0 transition-all duration-[1100ms] ease-silk group-hover:scale-100 group-hover:opacity-100"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 z-20 bg-ivory/90 px-3 py-1 text-[10px] uppercase tracking-luxe text-charcoal backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-charcoal backdrop-blur-sm transition-all duration-300 hover:bg-ivory"
        >
          <Heart
            className={`h-[15px] w-[15px] transition-colors ${wishlisted ? "fill-gold text-gold" : ""}`}
            strokeWidth={1.5}
          />
        </button>

        {/* Quick add — slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full p-3 transition-transform duration-500 ease-silk group-hover:translate-y-0">
          <button
            type="button"
            onClick={() => addItem(product)}
            className="flex w-full items-center justify-center gap-2 bg-charcoal/95 py-3 text-[11px] font-medium uppercase tracking-wide2 text-ivory backdrop-blur-sm transition-colors hover:bg-charcoal"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Quick Add
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-wide2 text-olive">{product.category}</p>
          <h3 className="mt-1 font-serif text-lg font-normal leading-snug text-charcoal">
            <Link href={href} className="transition-colors hover:text-charcoal-soft">
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="shrink-0 pt-0.5 font-serif text-lg text-charcoal">{formatPrice(product.price)}</p>
      </div>
    </motion.article>
  );
}
