"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { silk } from "@/lib/animations";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/currency";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, removeItem, updateQty } =
    useCart();

  // Lock body scroll while the cart is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[95] bg-charcoal/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[100] flex w-full max-w-md flex-col bg-ivory"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: silk }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
              <h2 className="flex items-center gap-2 font-serif text-2xl font-light">
                Your Bag
                <span className="text-sm text-olive">({count})</span>
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close bag"
                className="text-charcoal transition-transform hover:rotate-90 duration-300"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
                <ShoppingBag className="h-10 w-10 text-olive" strokeWidth={1} />
                <p className="font-serif text-2xl font-light">Your bag is empty</p>
                <p className="max-w-xs text-sm font-light text-charcoal-soft">
                  Discover timeless pieces made to be worn and loved for years.
                </p>
                <button onClick={closeCart} className="btn-primary mt-2">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Free-shipping progress */}
                <div className="border-b border-charcoal/10 px-6 py-4">
                  <p className="text-[12px] text-charcoal-soft">
                    {remaining > 0 ? (
                      <>
                        You&apos;re <span className="font-medium text-charcoal">{formatPrice(remaining)}</span>{" "}
                        away from free shipping.
                      </>
                    ) : (
                      <span className="font-medium text-charcoal">
                        ✦ You&apos;ve unlocked free shipping across India.
                      </span>
                    )}
                  </p>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-beige-deep">
                    <div
                      className="h-full rounded-full bg-gold transition-all duration-700 ease-silk"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Line items */}
                <ul className="flex-1 divide-y divide-charcoal/10 overflow-y-auto px-6">
                  {items.map((item) => (
                    <li key={item.key} className="flex gap-4 py-5">
                      <Link
                        href={`/products/${item.id}`}
                        onClick={closeCart}
                        className="relative h-28 w-20 shrink-0 overflow-hidden bg-beige"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${item.id}`}
                            onClick={closeCart}
                            className="font-serif text-base leading-snug hover:text-charcoal-soft"
                          >
                            {item.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            aria-label={`Remove ${item.name}`}
                            className="text-olive transition-colors hover:text-charcoal"
                          >
                            <X className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="mt-0.5 text-[11px] uppercase tracking-wide2 text-olive">
                          Size {item.size}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-3">
                          {/* Quantity stepper */}
                          <div className="flex items-center border border-charcoal/20">
                            <button
                              type="button"
                              onClick={() => updateQty(item.key, item.qty - 1)}
                              aria-label="Decrease quantity"
                              className="flex h-8 w-8 items-center justify-center text-charcoal transition-colors hover:bg-beige"
                            >
                              <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </button>
                            <span className="w-8 text-center text-sm tabular-nums">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.key, item.qty + 1)}
                              aria-label="Increase quantity"
                              className="flex h-8 w-8 items-center justify-center text-charcoal transition-colors hover:bg-beige"
                            >
                              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </button>
                          </div>
                          <p className="font-serif text-base">
                            {formatPrice(item.price * item.qty)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Footer / checkout */}
                <div className="border-t border-charcoal/10 px-6 py-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] uppercase tracking-wide2 text-olive">
                      Subtotal
                    </span>
                    <span className="font-serif text-2xl">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-[12px] text-charcoal-soft">
                    Shipping &amp; taxes calculated at checkout.
                  </p>
                  <button
                    type="button"
                    className="btn-primary mt-5 w-full"
                    onClick={() => alert("This is a demo storefront — checkout is not connected.")}
                  >
                    Checkout
                  </button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-3 w-full text-center text-[12px] uppercase tracking-wide2 text-charcoal-soft transition-colors hover:text-charcoal"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
