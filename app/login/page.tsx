import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Nissi account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to view your orders, addresses and saved pieces."
      image="https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=1100&q=80"
      footer={
        <>
          New to Nissi?{" "}
          <Link href="/signup" className="link-underline font-medium text-charcoal">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm redirect={redirect ?? "/account"} />
    </AuthShell>
  );
}
