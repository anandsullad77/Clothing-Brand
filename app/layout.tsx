import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import { WishlistProvider } from "@/components/wishlist/WishlistProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://nissi.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nissi — Timeless pieces for modern romantics",
    template: "%s · Nissi",
  },
  description:
    "Nissi crafts vintage-inspired women's clothing — thoughtfully designed dresses, knitwear and outerwear made to be worn and loved for years.",
  keywords: [
    "vintage fashion",
    "women's clothing",
    "slow fashion",
    "timeless dresses",
    "sustainable knitwear",
    "luxury boutique",
  ],
  authors: [{ name: "Nissi" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Nissi — Timeless pieces for modern romantics",
    description:
      "Vintage-inspired women's clothing crafted to be worn and loved for years.",
    siteName: "Nissi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nissi — Timeless pieces for modern romantics",
    description:
      "Vintage-inspired women's clothing crafted to be worn and loved for years.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8F5F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-charcoal focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <WishlistProvider>
          <CartProvider>{children}</CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
