"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeIn, fadeUp, stagger, viewportOnce } from "@/lib/animations";

export default function CollectionStory() {
  return (
    <section id="story" className="bg-beige/40 py-16 sm:py-20 lg:py-32">
      <div className="container-editorial grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image with a gentle fade reveal */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative order-1 aspect-[4/5] w-full overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=1100&q=80"
            alt="Autumn Atelier editorial — a model in soft knitwear against warm tones"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Floating accent frame */}
          <span className="pointer-events-none absolute inset-4 border border-ivory/40" />
        </motion.div>

        {/* Text block */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="order-2 max-w-xl"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            The New Collection
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="heading-serif mt-5 text-4xl sm:text-5xl lg:text-[3.75rem]"
          >
            Autumn <span className="italic text-olive">Atelier</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-7 text-base font-light leading-relaxed text-charcoal-soft"
          >
            Born in the quiet hours of a Jaipur studio, the Autumn Atelier is an
            ode to the slow craft of dressing. Each piece begins as a single sketch
            and a length of cloth — brushed merino, washed linen, and the kind of
            silk that warms to the body.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base font-light leading-relaxed text-charcoal-soft"
          >
            We work with heritage weavers and dyers across Gujarat and Tamil Nadu,
            dyeing in small lots so every garment carries the gentle irregularity of
            the hand. The result is a wardrobe that feels found rather than bought —
            timeless, tactile, and entirely yours.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-8 grid grid-cols-2 gap-4 text-[12px] uppercase tracking-wide2 text-charcoal">
            {["Handloom mulberry silk", "Stone-washed linen", "Brushed merino wool", "Hand-finished seams"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-10">
            <Link href="#new-arrivals" className="btn-primary group">
              View Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-silk group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
