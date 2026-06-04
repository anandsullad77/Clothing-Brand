"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { instagramImages } from "@/lib/data";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/animations";

export default function InstagramGallery() {
  return (
    <section className="bg-beige/40 py-16 sm:py-20 lg:py-32" aria-label="Instagram gallery">
      <div className="container-editorial">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 flex flex-col items-center gap-3 text-center"
        >
          <span className="eyebrow">@nissi</span>
          <h2 className="heading-serif text-4xl sm:text-5xl">Follow Nissi</h2>
          <p className="max-w-md text-base font-light text-charcoal-soft">
            Styling stories, atelier moments and the romance of everyday dressing.
          </p>
        </motion.div>

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4"
        >
          {instagramImages.map((src, i) => (
            <motion.a
              key={i}
              variants={fadeUp}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-beige"
              aria-label={`Instagram post ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Nissi Instagram post ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-[1100ms] ease-silk group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 text-ivory opacity-0 transition-all duration-500 group-hover:bg-charcoal/40 group-hover:opacity-100">
                <Instagram className="h-6 w-6" strokeWidth={1.5} />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
