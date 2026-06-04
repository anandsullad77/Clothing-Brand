// Mock data for the Nissi boutique landing page.
// Imagery uses high-quality Unsplash fashion photography as placeholders.

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "New Arrivals", href: "/#new-arrivals" },
  { label: "Dresses", href: "/#categories" },
  { label: "Knitwear", href: "/#categories" },
  { label: "Outerwear", href: "/#categories" },
  { label: "Journal", href: "/#journal" },
  { label: "About", href: "/#values" },
];

export type Category = {
  name: string;
  count: string;
  image: string;
  href: string;
};

export const categories: Category[] = [
  {
    name: "Dresses",
    count: "42 pieces",
    image: u("1595777457583-95e059d581b8"),
    href: "#new-arrivals",
  },
  {
    name: "Knitwear",
    count: "28 pieces",
    image: u("1576566588028-4147f3842f27"),
    href: "#new-arrivals",
  },
  {
    name: "Linen Collection",
    count: "19 pieces",
    image: u("1551489186-cf8726f514f8"),
    href: "#new-arrivals",
  },
  {
    name: "Outerwear",
    count: "23 pieces",
    image: u("1539109136881-3be0616acf4b"),
    href: "#new-arrivals",
  },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  hoverImage: string;
  badge?: string;
  /** Short editorial description shown on the product page. */
  description: string;
  /** One-line fabric / composition note. */
  fabric: string;
};

export const products: Product[] = [
  {
    id: "nissi-silk-midi",
    name: "Nissi Silk Midi Dress",
    category: "Dresses",
    price: 14900,
    image: u("1595777457583-95e059d581b8", 900),
    hoverImage: u("1591047139829-d91aecb6caea", 900),
    badge: "Bestseller",
    description:
      "Our signature midi, cut from fluid mulberry silk that catches the light and skims the body. A bias drape, covered buttons and a softly gathered waist make it as at home at a long lunch as a midnight soirée.",
    fabric: "100% mulberry silk · French seams",
  },
  {
    id: "colette-wool-cardigan",
    name: "Colette Merino Cardigan",
    category: "Knitwear",
    price: 11900,
    image: u("1576566588028-4147f3842f27", 900),
    hoverImage: u("1434389677669-e08b4cac3105", 900),
    description:
      "A heritage cardigan in brushed Italian merino, knitted on vintage gauge machines for a soft, lofty hand. Mother-of-pearl buttons and a relaxed shoulder make it the layer you reach for first.",
    fabric: "100% extra-fine merino wool",
  },
  {
    id: "margaux-linen-shirt",
    name: "Margaux Linen Shirt Dress",
    category: "Linen",
    price: 9900,
    image: u("1551489186-cf8726f514f8", 900),
    hoverImage: u("1485462537746-965f33f7f6a7", 900),
    badge: "New",
    description:
      "An easy shirt dress in stone-washed European linen that only softens with wear. Cinch the self-belt or leave it loose — it moves with you from market mornings to golden hour.",
    fabric: "100% stone-washed flax linen",
  },
  {
    id: "vivienne-wool-coat",
    name: "Vivienne Wool Coat",
    category: "Outerwear",
    price: 18900,
    image: u("1539109136881-3be0616acf4b", 900),
    hoverImage: u("1483985988355-763728e1935b", 900),
    description:
      "A timeless tailored coat in double-faced virgin wool, fully lined in cupro and finished with horn buttons. Quietly structured at the shoulder, it is built to see out a decade of winters.",
    fabric: "90% virgin wool · 10% cashmere",
  },
  {
    id: "juliette-pleated-skirt",
    name: "Juliette Pleated Skirt",
    category: "Skirts",
    price: 7900,
    image: u("1583496661160-fb5886a0aaaa", 900),
    hoverImage: u("1490481651871-ab68de25d43d", 900),
    description:
      "Knife-pleats fall from a flattering high waist in a featherweight crêpe that swishes as you walk. Sits at mid-calf — endlessly easy with knitwear and a boot, or a fine knit and flats.",
    fabric: "Recycled crêpe · permanent pleat",
  },
  {
    id: "delphine-cashmere",
    name: "Delphine Cashmere Sweater",
    category: "Knitwear",
    price: 12900,
    image: u("1434389677669-e08b4cac3105", 900),
    hoverImage: u("1576566588028-4147f3842f27", 900),
    badge: "Bestseller",
    description:
      "A grade-A Mongolian cashmere sweater spun for warmth without weight. The round neck and slightly cropped line layer beautifully over our shirt dresses and high-waisted trousers alike.",
    fabric: "100% grade-A Mongolian cashmere",
  },
  {
    id: "soleil-summer-dress",
    name: "Soleil Tiered Maxi Dress",
    category: "Dresses",
    price: 13900,
    image: u("1591047139829-d91aecb6caea", 900),
    hoverImage: u("1595777457583-95e059d581b8", 900),
    description:
      "Romance, tiered. This floor-grazing maxi gathers through soft cotton-voile tiers for effortless movement, with a smocked back and adjustable ties for a made-to-measure fit.",
    fabric: "100% organic cotton voile",
  },
  {
    id: "amelie-trench",
    name: "Amélie Belted Trench",
    category: "Outerwear",
    price: 17900,
    image: u("1483985988355-763728e1935b", 900),
    hoverImage: u("1539109136881-3be0616acf4b", 900),
    badge: "New",
    description:
      "The Parisian trench, reimagined. Water-resistant cotton gabardine, a storm yoke and a self-tie waist give this classic its quiet authority. Throw it over everything, all year round.",
    fabric: "Water-resistant cotton gabardine",
  },
];

/** Sizes offered across the ready-to-wear range. */
export const productSizes = ["XS", "S", "M", "L", "XL"] as const;

/** Reassurances shown beneath the add-to-cart on every product page. */
export const productPromises = [
  "Free express shipping across India over ₹10,000",
  "Easy 30-day returns & exchanges",
  "Handcrafted in small-batch ateliers across India",
];

/** Look up a single product by id. */
export const getProduct = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

/** Related products — same category first, then padded to `count`. */
export const getRelatedProducts = (id: string, count = 4): Product[] => {
  const current = getProduct(id);
  if (!current) return products.slice(0, count);
  const sameCategory = products.filter(
    (p) => p.id !== id && p.category === current.category
  );
  const others = products.filter(
    (p) => p.id !== id && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, count);
};

export type Value = {
  title: string;
  description: string;
  icon: "leaf" | "heart" | "clock";
};

export const brandValues: Value[] = [
  {
    title: "Sustainable Materials",
    description:
      "Natural fibres — organic cotton, responsible wool and handloom linen — chosen for longevity, not seasons.",
    icon: "leaf",
  },
  {
    title: "Ethical Production",
    description:
      "Made in small family-run ateliers where every maker is paid fairly and every stitch is considered.",
    icon: "heart",
  },
  {
    title: "Timeless Design",
    description:
      "Silhouettes that quietly outlast trends, designed to live in your wardrobe for a decade and beyond.",
    icon: "clock",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aanya Mehta",
    location: "Mumbai, India",
    quote:
      "The silk midi is the most beautiful thing I own. The drape, the weight — it feels like it was made for me alone.",
    avatar: u("1494790108377-be9c29b29330", 300),
  },
  {
    id: "t2",
    name: "Diya Kapoor",
    location: "New Delhi, India",
    quote:
      "I've worn the wool coat through two Delhi winters and it only looks more lovely. This is what quality is supposed to feel like.",
    avatar: u("1438761681033-6461ffad8d80", 300),
  },
  {
    id: "t3",
    name: "Ananya Iyer",
    location: "Bengaluru, India",
    quote:
      "Nissi understands restraint. Nothing shouts, everything endures. My wardrobe finally feels intentional.",
    avatar: u("1500648767791-00dcc994a43e", 300),
  },
  {
    id: "t4",
    name: "Saanvi Reddy",
    location: "Hyderabad, India",
    quote:
      "From the cotton packaging to the hand-written note, every detail is considered. It feels like a love letter to slow fashion.",
    avatar: u("1534528741775-53994a69daeb", 300),
  },
  {
    id: "t5",
    name: "Ishita Nair",
    location: "Chennai, India",
    quote:
      "I came for one dress and stayed for the philosophy. These are the pieces I reach for again and again.",
    avatar: u("1531123897727-8f129e1688ce", 300),
  },
];

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
};

export const articles: Article[] = [
  {
    id: "slow-fashion",
    title: "The Art of Slow Fashion",
    excerpt:
      "Why buying less — and buying better — is the most romantic thing you can do for your wardrobe.",
    category: "Philosophy",
    readTime: "6 min read",
    image: u("1469334031218-e382a71b716b", 900),
  },
  {
    id: "timeless-wardrobe",
    title: "Building a Timeless Wardrobe",
    excerpt:
      "The twelve foundational pieces every modern romantic should own, and how to wear each one a hundred ways.",
    category: "Style Guide",
    readTime: "8 min read",
    image: u("1485968579580-b6d095142e6e", 900),
  },
  {
    id: "fabrics-that-last",
    title: "Fabrics That Last",
    excerpt:
      "A field guide to the natural fibres we love — how they're made, how to care for them, and why they age beautifully.",
    category: "Craft",
    readTime: "5 min read",
    image: u("1532453288672-3a27e9be9efd", 900),
  },
];

export const instagramImages: string[] = [
  u("1490481651871-ab68de25d43d", 600),
  u("1485462537746-965f33f7f6a7", 600),
  u("1483985988355-763728e1935b", 600),
  u("1539109136881-3be0616acf4b", 600),
  u("1595777457583-95e059d581b8", 600),
  u("1576566588028-4147f3842f27", 600),
];

export type FooterColumn = { title: string; links: string[] };

export const footerColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: ["New Arrivals", "Dresses", "Knitwear", "Outerwear", "Linen", "Gift Cards"],
  },
  {
    title: "Company",
    links: ["Our Story", "Sustainability", "Ateliers", "Careers", "Press"],
  },
  {
    title: "Support",
    links: ["Contact", "Shipping & Returns", "Size Guide", "Care Guide", "FAQ"],
  },
];
