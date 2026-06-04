import WishlistGrid from "@/components/account/WishlistGrid";

export default function WishlistPage() {
  return (
    <div>
      <h2 className="font-serif text-2xl font-light text-charcoal">Your wishlist</h2>
      <p className="mt-1 text-sm font-light text-charcoal-soft">
        The pieces you&apos;re saving for later, synced to your account.
      </p>
      <div className="mt-8">
        <WishlistGrid />
      </div>
    </div>
  );
}
