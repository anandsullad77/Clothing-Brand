"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/lib/data";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/animations";
import JournalCard from "./JournalCard";

export default function Journal() {
  return (
    <section id="journal" className="bg-ivory py-16 sm:py-20 lg:py-32">
      <div className="container-editorial">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-xl"
          >
            <span className="eyebrow">The Journal</span>
            <h2 className="heading-serif mt-4 text-4xl sm:text-5xl lg:text-[3.5rem]">
              Notes on slow living
            </h2>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <Link
              href="#journal"
              className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-wide2 text-charcoal"
            >
              <span className="link-underline">All stories</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-silk group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8"
        >
          {articles.map((article) => (
            <JournalCard key={article.id} article={article} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
