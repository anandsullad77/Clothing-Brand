"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { fadeUp, viewportOnce } from "@/lib/animations";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  const [paused, setPaused] = useState(false);
  // Duplicate the set so the loop is seamless.
  const track = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-beige/50 py-16 sm:py-20 lg:py-32"
      aria-label="Customer testimonials"
    >
      <div className="container-editorial mb-14">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center"
        >
          <span className="eyebrow">Words from the wardrobe</span>
          <h2 className="heading-serif text-4xl sm:text-5xl lg:text-[3.5rem]">
            Loved in every language
          </h2>
        </motion.div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Soft edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-beige/80 to-transparent lg:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-beige/80 to-transparent lg:w-32" />

        <motion.div
          className="flex gap-6 px-3"
          animate={{ x: paused ? undefined : ["0%", "-50%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration: 38 },
          }}
        >
          {track.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
