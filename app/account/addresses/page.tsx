import { redirect } from "next/navigation";
import AddressManager from "@/components/account/AddressManager";
import { createClient } from "@/lib/supabase/server";
import type { Address } from "@/lib/supabase/types";

export default async function AddressesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: true });

  return (
    <div>
      <h2 className="font-serif text-2xl font-light text-charcoal">Shipping addresses</h2>
      <p className="mt-1 text-sm font-light text-charcoal-soft">
        Save addresses for a faster checkout.
      </p>
      <div className="mt-8">
        <AddressManager userId={user.id} initial={(data as Address[]) ?? []} />
      </div>
    </div>
  );
}
