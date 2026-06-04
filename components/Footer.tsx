import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { footerColumns } from "@/lib/data";

const socials = [
  { label: "Instagram", Icon: Instagram },
  { label: "Facebook", Icon: Facebook },
  { label: "Twitter", Icon: Twitter },
  { label: "YouTube", Icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-ivory text-charcoal">
      <div className="container-editorial py-20 lg:py-24">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12 lg:gap-12">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-4">
            <p className="font-serif text-3xl tracking-[0.18em]">NISSI</p>
            <p className="mt-1 text-[10px] uppercase tracking-luxe text-olive">
              India · Est. 2021
            </p>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-charcoal-soft">
              Timeless pieces for modern romantics. Designed in Mumbai, crafted
              with artisans across India.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-all duration-500 ease-silk hover:border-gold hover:bg-gold hover:text-charcoal"
                >
                  <Icon className="h-[17px] w-[17px]" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <div key={column.title} className="md:col-span-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-wide2 text-charcoal">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm font-light text-charcoal-soft transition-colors hover:text-charcoal"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="md:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-wide2 text-charcoal">
              Social
            </h3>
            <ul className="mt-5 space-y-3 text-sm font-light text-charcoal-soft">
              <li>@nissi</li>
              <li>Pinterest</li>
              <li>TikTok</li>
              <li>
                <a href="mailto:hello@nissi.com" className="link-underline hover:text-charcoal">
                  hello@nissi.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-charcoal/10">
        <div className="container-editorial flex flex-col items-center justify-between gap-4 py-7 text-[11px] uppercase tracking-wide2 text-olive sm:flex-row">
          <p>© {1996 + 30} Nissi. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="#" className="transition-colors hover:text-charcoal">Privacy Policy</Link>
            <Link href="#" className="transition-colors hover:text-charcoal">Terms of Service</Link>
            <Link href="#" className="transition-colors hover:text-charcoal">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
