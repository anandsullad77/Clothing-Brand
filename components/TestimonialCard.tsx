import Image from "next/image";
import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/data";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full w-[88vw] shrink-0 flex-col bg-ivory p-8 shadow-soft sm:w-[420px] lg:p-10">
      <Quote className="h-8 w-8 text-gold/50" strokeWidth={1.25} aria-hidden />
      <div className="mt-4 flex gap-0.5 text-gold" aria-label="Five out of five stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-gold" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 font-serif text-xl font-light italic leading-relaxed text-charcoal lg:text-[1.4rem]">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-4 border-t border-charcoal/10 pt-6">
        <span className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </span>
        <span>
          <p className="text-sm font-medium text-charcoal">{testimonial.name}</p>
          <p className="text-[11px] uppercase tracking-wide2 text-olive">{testimonial.location}</p>
        </span>
      </figcaption>
    </figure>
  );
}
