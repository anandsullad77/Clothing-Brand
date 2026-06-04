"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/animations";
import ProductCard from "./ProductCard";

export default function BestSellers() {
  return (
    <section id="new-arrivals" className="bg-ivory py-16 sm:py-20 lg:py-32">
      <div className="container-editorial">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-xl"
          >
            <span className="eyebrow">Loved by many</span>
            <h2 className="heading-serif mt-4 text-4xl sm:text-5xl lg:text-[3.5rem]">
              Our best sellers
            </h2>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <Link
              href="#categories"
              className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-wide2 text-charcoal"
            >
              <span className="link-underline">View all pieces</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-silk group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
