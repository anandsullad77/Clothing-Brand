"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { silk } from "@/lib/animations";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: image drifts slower than the page; text lifts gently away.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-22%"]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: silk } },
  };

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden bg-ivory"
      aria-label="Nissi hero"
    >
      <div className="container-editorial grid grid-cols-1 items-center gap-8 pb-14 pt-4 lg:min-h-[92vh] lg:grid-cols-2 lg:gap-16 lg:pb-0 lg:pt-0">
        {/* Text */}
        <motion.div
          style={{ y: textY }}
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 order-2 max-w-xl lg:order-1"
        >
          <motion.p variants={item} className="eyebrow mb-6">
            The Autumn Atelier · 2026
          </motion.p>
          <motion.h1
            variants={item}
            className="heading-serif text-balance text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            Clothing that <span className="italic text-olive">transcends</span> seasons
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-7 max-w-md text-base font-light leading-relaxed text-charcoal-soft sm:text-lg"
          >
            Thoughtfully designed pieces crafted to be worn and loved for years —
            not seasons. Vintage souls, made for the modern romantic.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="#new-arrivals" className="btn-primary group">
              Shop Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-silk group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
            <Link href="#story" className="btn-ghost">
              Explore Story
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex items-center gap-8 border-t border-charcoal/10 pt-8 text-charcoal"
          >
            <div>
              <p className="font-serif text-3xl">28k+</p>
              <p className="text-[11px] uppercase tracking-wide2 text-olive">Devoted customers</p>
            </div>
            <div className="h-10 w-px bg-charcoal/15" />
            <div>
              <p className="font-serif text-3xl">100%</p>
              <p className="text-[11px] uppercase tracking-wide2 text-olive">Natural fibres</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: silk }}
          className="relative order-1 h-[52vh] w-full overflow-hidden sm:h-[60vh] lg:order-2 lg:h-[92vh]"
        >
          <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 will-change-transform">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80"
              alt="Model wearing a flowing Nissi silk dress in warm natural light"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/15 via-transparent to-transparent" />
          </motion.div>

          {/* Floating editorial caption */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, ease: silk }}
            className="absolute bottom-6 left-6 bg-ivory/90 px-6 py-4 backdrop-blur-sm"
          >
            <p className="font-serif text-lg italic text-charcoal">The Nissi Silk Midi</p>
            <p className="text-[11px] uppercase tracking-wide2 text-olive">from ₹14,900</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-luxe text-olive">Scroll</span>
        <span className="h-12 w-px bg-gradient-to-b from-olive to-transparent" />
      </motion.div>
    </section>
  );
}
