import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Editorial two-column shell for the login / signup screens:
 * a full-height fashion image beside a centred form card.
 */
export default function AuthShell({
  title,
  subtitle,
  image,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  image: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-ivory lg:grid-cols-2">
      {/* Image side */}
      <div className="relative hidden lg:block">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/20" />
        <Link
          href="/"
          className="absolute left-10 top-10 font-serif text-2xl tracking-[0.22em] text-ivory"
        >
          NISSI
        </Link>
        <p className="absolute bottom-10 left-10 max-w-xs font-serif text-2xl font-light italic leading-snug text-ivory">
          Timeless pieces for modern romantics.
        </p>
      </div>

      {/* Form side */}
      <div className="relative flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
        {/* Back to shop — always visible */}
        <Link
          href="/"
          className="group absolute left-6 top-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-wide2 text-charcoal-soft transition-colors hover:text-charcoal sm:left-10 lg:left-16"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} />
          Back to shop
        </Link>

        <div className="mx-auto w-full max-w-sm">
          <Link
            href="/"
            className="mb-10 inline-block font-serif text-2xl tracking-[0.22em] text-charcoal lg:hidden"
          >
            NISSI
          </Link>
          <h1 className="heading-serif text-4xl">{title}</h1>
          <p className="mt-3 text-sm font-light text-charcoal-soft">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <div className="mt-8 text-center text-sm font-light text-charcoal-soft">
            {footer}
          </div>
        </div>
      </div>
    </main>
  );
}
