"use client";

import { motion } from "framer-motion";
import { Clock, Heart, Leaf } from "lucide-react";
import { brandValues, type Value } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

const iconMap: Record<Value["icon"], typeof Leaf> = {
  leaf: Leaf,
  heart: Heart,
  clock: Clock,
};

export default function BrandValues() {
  return (
    <section id="values" className="bg-charcoal py-16 text-ivory sm:py-20 lg:py-32">
      <div className="container-editorial">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-16 flex max-w-2xl flex-col items-center gap-4 text-center"
        >
          <motion.span variants={fadeUp} className="text-[11px] uppercase tracking-luxe text-gold">
            The Nissi promise
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl font-light leading-[1.05] text-balance sm:text-5xl lg:text-[3.5rem]"
          >
            Made slowly, on purpose
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-lg text-base font-light leading-relaxed text-ivory/70">
            We measure success in decades, not seasons. Three principles guide every
            decision we make — from the fibre we choose to the hands that sew it.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-px overflow-hidden border border-ivory/10 md:grid-cols-3"
        >
          {brandValues.map((value) => {
            const Icon = iconMap[value.icon];
            return (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="group bg-charcoal p-10 transition-colors duration-700 hover:bg-charcoal-soft lg:p-12"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-700 ease-silk group-hover:bg-gold group-hover:text-charcoal">
                  <Icon className="h-6 w-6" strokeWidth={1.25} />
                </span>
                <h3 className="mt-8 font-serif text-2xl font-light">{value.title}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-ivory/65">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
