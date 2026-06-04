"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, Check, Loader2, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

export default function ProfileForm({
  profile,
  email,
}: {
  profile: Profile;
  email: string;
}) {
  const router = useRouter();
  const supabase = useRef(createClient());
  const fileInput = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState(profile.full_name ?? "");
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? "");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);

    const sb = supabase.current;
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${profile.id}/avatar-${Date.now()}.${ext}`;

    const { error: uploadError } = await sb.storage
      .from("avatars")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = sb.storage.from("avatars").getPublicUrl(path);

    setAvatarUrl(publicUrl);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);

    const { error: updateError } = await supabase.current
      .from("profiles")
      .update({
        full_name: fullName,
        phone,
        avatar_url: avatarUrl || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);

    setSaving(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setSaved(true);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      {error && (
        <p role="alert" className="mb-6 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* Avatar */}
      <div className="mb-8 flex items-center gap-5">
        <div className="relative h-20 w-20 overflow-hidden rounded-full bg-beige">
          {avatarUrl ? (
            <Image src={avatarUrl} alt="" fill sizes="80px" className="object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-olive">
              <User className="h-8 w-8" strokeWidth={1.25} />
            </span>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 border border-charcoal/25 px-4 py-2.5 text-[12px] uppercase tracking-wide2 text-charcoal transition-colors hover:border-charcoal disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4" strokeWidth={1.5} />
            )}
            {avatarUrl ? "Change photo" : "Upload photo"}
          </button>
          <p className="mt-2 text-[11px] text-charcoal-soft">JPG or PNG, up to ~2MB.</p>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            onChange={handleAvatar}
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-[12px] uppercase tracking-wide2 text-charcoal">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-charcoal/25 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-charcoal"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-[12px] uppercase tracking-wide2 text-charcoal">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="w-full cursor-not-allowed border border-charcoal/15 bg-beige/40 px-4 py-3 text-sm text-charcoal-soft"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-[12px] uppercase tracking-wide2 text-charcoal">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full border border-charcoal/25 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-charcoal"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-olive">
            <Check className="h-4 w-4" strokeWidth={2} /> Saved
          </span>
        )}
      </div>
    </form>
  );
}
