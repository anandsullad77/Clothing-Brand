"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/data";
import { fadeUp } from "@/lib/animations";

type Props = {
  category: Category;
  /** Taller card used for the asymmetric editorial grid. */
  featured?: boolean;
};

export default function CategoryCard({ category, featured = false }: Props) {
  return (
    <motion.div variants={fadeUp} className="group h-full">
      <Link
        href={category.href}
        className="relative block h-full overflow-hidden bg-beige"
        aria-label={`Shop ${category.name}`}
      >
        <div className={`relative w-full overflow-hidden ${featured ? "aspect-[3/4] lg:aspect-auto lg:h-full" : "aspect-[4/5]"}`}>
          <Image
            src={category.image}
            alt={`${category.name} collection`}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-[1100ms] ease-silk group-hover:scale-110"
          />
          {/* Elegant overlay that deepens on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent transition-opacity duration-700 group-hover:from-charcoal/80" />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 lg:p-7">
          <div className="translate-y-0 transition-transform duration-700 ease-silk">
            <p className="text-[11px] uppercase tracking-luxe text-ivory/70">{category.count}</p>
            <h3 className="mt-1 font-serif text-2xl font-light text-ivory lg:text-3xl">
              {category.name}
            </h3>
            <span className="mt-2 inline-flex max-h-0 items-center gap-1.5 overflow-hidden whitespace-nowrap text-[11px] uppercase tracking-wide2 text-gold opacity-0 transition-all duration-500 ease-silk group-hover:mt-2 group-hover:max-h-8 group-hover:opacity-100">
              Shop the edit
            </span>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ivory/40 text-ivory transition-all duration-500 ease-silk group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
