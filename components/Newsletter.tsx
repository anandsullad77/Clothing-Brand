"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Mock submission — integrate with your ESP here.
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section
      className="relative overflow-hidden bg-charcoal py-16 text-ivory sm:py-20 lg:py-32"
      aria-label="Newsletter signup"
    >
      {/* Subtle decorative serif glyph */}
      <span className="pointer-events-none absolute -right-10 -top-16 select-none font-serif text-[22rem] leading-none text-ivory/[0.03]">
        A
      </span>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-editorial relative mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <motion.span variants={fadeUp} className="text-[11px] uppercase tracking-luxe text-gold">
          The inner circle
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="mt-5 font-serif text-4xl font-light leading-[1.05] text-balance sm:text-5xl lg:text-[3.75rem]"
        >
          Join Nissi
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 max-w-lg text-base font-light leading-relaxed text-ivory/70">
          Be first to discover new collections, private atelier sales and slow-living
          stories from Nissi. Enjoy 10% off your first order.
        </motion.p>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 border-b border-ivory/30 bg-transparent px-1 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-gold px-8 py-3.5 text-[12px] font-medium uppercase tracking-wide2 text-charcoal transition-all duration-500 ease-silk hover:bg-gold-soft hover:tracking-[0.18em]"
          >
            {submitted ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2} /> Subscribed
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </motion.form>

        <motion.p
          variants={fadeUp}
          aria-live="polite"
          className="mt-4 h-5 text-[12px] text-ivory/50"
        >
          {submitted
            ? "Welcome to Nissi — your code is on its way."
            : "By subscribing you agree to our Privacy Policy."}
        </motion.p>
      </motion.div>
    </section>
  );
}
