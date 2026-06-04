"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { silk } from "@/lib/animations";
import { useCart } from "@/components/cart/CartProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { count, openCart } = useCart();

  // Portals require the DOM; only render the drawer after mount.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-700 ease-silk ${
        scrolled
          ? "bg-ivory/85 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`container-editorial flex items-center justify-between transition-all duration-700 ease-silk ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="text-charcoal lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>

        {/* Left nav (desktop) */}
        <ul className="hidden flex-1 items-center gap-8 text-[12px] font-medium uppercase tracking-wide2 text-charcoal lg:flex">
          {navLinks.slice(0, 3).map((link) => (
            <li key={link.label}>
              <a href={link.href} className="link-underline transition-colors hover:text-charcoal-soft">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col items-center leading-none lg:flex-1"
          aria-label="Nissi — home"
        >
          <span className="font-serif text-2xl font-medium tracking-[0.22em] text-charcoal sm:text-[26px]">
            NISSI
          </span>
          <span className="mt-0.5 text-[8px] uppercase tracking-luxe text-olive">
            India · Est. 2021
          </span>
        </Link>

        {/* Right nav + icons (desktop) */}
        <div className="flex flex-1 items-center justify-end gap-6">
          <ul className="hidden items-center gap-8 text-[12px] font-medium uppercase tracking-wide2 text-charcoal lg:flex">
            {navLinks.slice(3).map((link) => (
              <li key={link.label}>
                <a href={link.href} className="link-underline transition-colors hover:text-charcoal-soft">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              type="button"
              aria-label="Search"
              className="text-charcoal transition-transform duration-300 hover:-translate-y-0.5 hover:text-gold"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden text-charcoal transition-transform duration-300 hover:-translate-y-0.5 hover:text-gold sm:block"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
              className="relative text-charcoal transition-transform duration-300 hover:-translate-y-0.5 hover:text-gold"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-charcoal">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer — portaled to <body> so it escapes the sticky header's
          backdrop-filter stacking/containing context (otherwise it breaks once
          the header blurs on scroll). */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <>
                <motion.div
                  className="fixed inset-0 z-[80] bg-charcoal/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-[90] flex w-[82%] max-w-sm flex-col bg-ivory px-8 py-7 lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: silk }}
              aria-label="Mobile menu"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl font-medium tracking-[0.22em] text-charcoal">
                  NISSI
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-charcoal"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
              <ul className="mt-12 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-2xl font-light text-charcoal"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-2xl font-light text-charcoal"
                  >
                    My Account
                  </Link>
                </li>
              </ul>
              <div className="mt-auto border-t border-charcoal/10 pt-6 text-[11px] uppercase tracking-luxe text-olive">
                Free shipping across India over ₹10,000
              </div>
            </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
