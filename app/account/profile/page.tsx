import { redirect } from "next/navigation";
import ProfileForm from "@/components/account/ProfileForm";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fall back to a blank profile shape if the row hasn't been created yet.
  const profile: Profile = data ?? {
    id: user.id,
    full_name: (user.user_metadata?.full_name as string) ?? null,
    phone: null,
    avatar_url: null,
    updated_at: null,
  };

  return (
    <div>
      <h2 className="font-serif text-2xl font-light text-charcoal">Profile details</h2>
      <p className="mt-1 text-sm font-light text-charcoal-soft">
        Update your personal information and photo.
      </p>
      <div className="mt-8">
        <ProfileForm profile={profile} email={user.email ?? ""} />
      </div>
    </div>
  );
}
