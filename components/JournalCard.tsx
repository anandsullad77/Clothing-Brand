"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/data";
import { fadeUp } from "@/lib/animations";

export default function JournalCard({ article }: { article: Article }) {
  return (
    <motion.article variants={fadeUp} className="group flex flex-col">
      <Link href="#journal" className="block" aria-label={article.title}>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[1100ms] ease-silk group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 bg-ivory/90 px-3 py-1 text-[10px] uppercase tracking-luxe text-charcoal backdrop-blur-sm">
            {article.category}
          </span>
        </div>

        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-wide2 text-olive">{article.readTime}</p>
          <h3 className="mt-2 font-serif text-2xl font-light leading-snug text-charcoal transition-colors group-hover:text-charcoal-soft">
            {article.title}
          </h3>
          <p className="mt-3 text-sm font-light leading-relaxed text-charcoal-soft">
            {article.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-wide2 text-charcoal">
            <span className="link-underline">Read article</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-silk group-hover:translate-x-1" strokeWidth={1.5} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
