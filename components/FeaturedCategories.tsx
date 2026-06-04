"use client";

import { motion } from "framer-motion";
import { categories } from "@/lib/data";
import { staggerFast, viewportOnce } from "@/lib/animations";
import SectionHeading from "./SectionHeading";
import CategoryCard from "./CategoryCard";

export default function FeaturedCategories() {
  return (
    <section id="categories" className="bg-ivory py-16 sm:py-20 lg:py-32">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Explore Nissi"
          title="Curated by category"
          description="Four edits, each built around a single idea — pieces designed to be layered, lived in, and kept for years."
          align="center"
          className="mb-14 lg:mb-16"
        />

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
        >
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
