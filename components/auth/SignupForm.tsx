"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/confirm?next=/account`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // If email confirmation is ON, there's no active session yet.
    if (data.session) {
      router.push("/account");
      router.refresh();
    } else {
      setCheckEmail(true);
      setLoading(false);
    }
  };

  if (checkEmail) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <CheckCircle2 className="h-10 w-10 text-olive" strokeWidth={1.25} />
        <p className="font-serif text-2xl font-light">Check your inbox</p>
        <p className="text-sm font-light text-charcoal-soft">
          We&apos;ve sent a confirmation link to{" "}
          <span className="font-medium text-charcoal">{email}</span>. Click it to
          activate your account, then sign in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && (
        <p role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="fullName" className="mb-1.5 block text-[12px] uppercase tracking-wide2 text-charcoal">
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-charcoal/25 bg-transparent px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-charcoal"
          placeholder="Aanya Mehta"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-[12px] uppercase tracking-wide2 text-charcoal">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-charcoal/25 bg-transparent px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-charcoal"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-[12px] uppercase tracking-wide2 text-charcoal">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-charcoal/25 bg-transparent px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-charcoal"
          placeholder="At least 6 characters"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
      </button>

      <p className="text-center text-[11px] leading-relaxed text-charcoal-soft">
        By creating an account you agree to Nissi&apos;s Terms of Service and
        Privacy Policy.
      </p>
    </form>
  );
}
