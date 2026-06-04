import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import CollectionStory from "@/components/CollectionStory";
import BestSellers from "@/components/BestSellers";
import BrandValues from "@/components/BrandValues";
import Testimonials from "@/components/Testimonials";
import Journal from "@/components/Journal";
import InstagramGallery from "@/components/InstagramGallery";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "Nissi",
  description:
    "Vintage-inspired women's clothing crafted to be worn and loved for years.",
  slogan: "Timeless pieces for modern romantics.",
  image:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  areaServed: "IN",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnnouncementBar />
      <Navbar />
      <main id="main">
        <Hero />
        <FeaturedCategories />
        <CollectionStory />
        <BestSellers />
        <BrandValues />
        <Testimonials />
        <Journal />
        <InstagramGallery />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
