"use client";

const messages = [
  "Free express shipping across India on orders over ₹10,000",
  "Complimentary gift wrapping on every order",
  "New — The Autumn Atelier collection has arrived",
  "Handcrafted in small batches by artisans across India",
];

export default function AnnouncementBar() {
  // Duplicated track creates a seamless, infinite marquee loop.
  const track = [...messages, ...messages];

  return (
    <div className="relative z-30 overflow-hidden bg-charcoal text-ivory">
      <div className="flex w-max animate-marquee pause-on-hover whitespace-nowrap">
        {track.map((message, i) => (
          <span
            key={i}
            className="flex items-center text-[11px] font-light uppercase tracking-luxe"
            aria-hidden={i >= messages.length}
          >
            <span className="px-8 py-2.5">{message}</span>
            <span className="text-gold/70">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
