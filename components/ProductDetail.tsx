"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import {
  productPromises,
  productSizes,
  type Product,
} from "@/lib/data";
import { formatPrice } from "@/lib/currency";
import { silk } from "@/lib/animations";
import { useCart } from "@/components/cart/CartProvider";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import ProductCard from "@/components/ProductCard";

const promiseIcons = [Truck, ShieldCheck, Star];

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-charcoal/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left text-[12px] font-medium uppercase tracking-wide2 text-charcoal"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ease-silk ${
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden text-sm font-light leading-relaxed text-charcoal-soft">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const gallery = [product.image, product.hoverImage];
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const wishlisted = has(product.id);

  const handleAdd = () => {
    if (!size) {
      setError(true);
      return;
    }
    addItem(product, { size, qty });
  };

  return (
    <>
      <section className="container-editorial py-10 lg:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-[12px] uppercase tracking-wide2 text-olive">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <span className="px-2">/</span>
          <Link href="/#new-arrivals" className="hover:text-charcoal">{product.category}</Link>
          <span className="px-2">/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: silk }}
            className="flex flex-col-reverse gap-4 sm:flex-row"
          >
            {/* Thumbnails */}
            <div className="flex gap-3 sm:flex-col">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onMouseEnter={() => setActiveImage(i)}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative h-20 w-16 shrink-0 overflow-hidden bg-beige transition-opacity sm:h-24 sm:w-20 ${
                    activeImage === i ? "ring-1 ring-charcoal" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-beige">
              {gallery.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${product.name} — view ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className={`object-cover transition-opacity duration-700 ease-silk ${
                    activeImage === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              {product.badge && (
                <span className="absolute left-4 top-4 bg-ivory/90 px-3 py-1 text-[10px] uppercase tracking-luxe text-charcoal backdrop-blur-sm">
                  {product.badge}
                </span>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: silk, delay: 0.1 }}
            className="lg:py-4"
          >
            <p className="eyebrow">{product.category}</p>
            <h1 className="heading-serif mt-3 text-4xl sm:text-5xl">{product.name}</h1>

            <div className="mt-4 flex items-center gap-4">
              <p className="font-serif text-2xl text-charcoal">{formatPrice(product.price)}</p>
              <span className="flex items-center gap-1 text-gold" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold" strokeWidth={0} />
                ))}
                <span className="ml-1 text-[12px] text-olive">(128)</span>
              </span>
            </div>

            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-charcoal-soft">
              {product.description}
            </p>
            <p className="mt-3 text-[12px] uppercase tracking-wide2 text-olive">{product.fabric}</p>

            {/* Size selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium uppercase tracking-wide2 text-charcoal">
                  Size{size ? `: ${size}` : ""}
                </span>
                <button type="button" className="text-[12px] uppercase tracking-wide2 text-olive link-underline">
                  Size guide
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {productSizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setError(false);
                    }}
                    aria-pressed={size === s}
                    className={`flex h-11 min-w-[2.75rem] items-center justify-center px-3 text-sm transition-all duration-300 ${
                      size === s
                        ? "bg-charcoal text-ivory"
                        : "border border-charcoal/25 text-charcoal hover:border-charcoal"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && (
                <p role="alert" className="mt-2 text-[12px] text-red-700">
                  Please select a size.
                </p>
              )}
            </div>

            {/* Quantity + add to bag */}
            <div className="mt-7 flex items-stretch gap-3">
              <div className="flex items-center border border-charcoal/25">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-full w-11 items-center justify-center text-charcoal transition-colors hover:bg-beige"
                >
                  <Minus className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-full w-11 items-center justify-center text-charcoal transition-colors hover:bg-beige"
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <button type="button" onClick={handleAdd} className="btn-primary flex-1">
                Add to Bag — {formatPrice(product.price * qty)}
              </button>

              <button
                type="button"
                onClick={() => toggle(product.id)}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wishlisted}
                className="flex w-12 items-center justify-center border border-charcoal/25 text-charcoal transition-colors hover:border-charcoal"
              >
                <Heart
                  className={`h-[18px] w-[18px] ${wishlisted ? "fill-gold text-gold" : ""}`}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* Promises */}
            <ul className="mt-7 space-y-2.5">
              {productPromises.map((promise, i) => {
                const Icon = promiseIcons[i] ?? Truck;
                return (
                  <li key={promise} className="flex items-center gap-3 text-sm font-light text-charcoal-soft">
                    <Icon className="h-4 w-4 text-olive" strokeWidth={1.5} />
                    {promise}
                  </li>
                );
              })}
            </ul>

            {/* Accordions */}
            <div className="mt-8">
              <Accordion title="Details & Fit" defaultOpen>
                <p>{product.description}</p>
                <ul className="mt-3 list-disc space-y-1 pl-4">
                  <li>{product.fabric}</li>
                  <li>Model is 178cm and wears a size S.</li>
                  <li>True to size — take your usual size.</li>
                </ul>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <p>
                  Complimentary shipping across India on orders over ₹10,000.
                  Standard delivery in 3–5 business days. Enjoy free 30-day returns
                  and exchanges on all unworn pieces.
                </p>
              </Accordion>
              <Accordion title="Care">
                <p>
                  Made to last with a little care. Dry clean or hand-wash cold,
                  reshape and dry flat away from direct sunlight. Store folded to
                  preserve the fabric&apos;s natural drape.
                </p>
              </Accordion>
            </div>
          </motion.div>
        </div>
      </section>

      {/* You may also like */}
      {related.length > 0 && (
        <section className="border-t border-charcoal/10 bg-ivory py-20 lg:py-24">
          <div className="container-editorial">
            <h2 className="heading-serif mb-10 text-center text-3xl sm:text-4xl">
              You may also like
            </h2>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
