import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Nissi account.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Join Nissi"
      subtitle="Create an account for faster checkout, order tracking and a wishlist that follows you everywhere."
      image="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1100&q=80"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="link-underline font-medium text-charcoal">
            Sign in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
