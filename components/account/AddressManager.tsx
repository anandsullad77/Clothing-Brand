"use client";

import { useRef, useState } from "react";
import { Loader2, MapPin, Pencil, Plus, Star, Trash2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Address } from "@/lib/supabase/types";

type Draft = Omit<Address, "id" | "user_id" | "created_at">;

const emptyDraft: Draft = {
  full_name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  is_default: false,
};

export default function AddressManager({
  userId,
  initial,
}: {
  userId: string;
  initial: Address[];
}) {
  const supabase = useRef(createClient());
  const [addresses, setAddresses] = useState<Address[]>(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(initial.length === 0);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setDraft(emptyDraft);
    setEditingId(null);
    setShowForm(false);
    setError(null);
  };

  const startEdit = (a: Address) => {
    setEditingId(a.id);
    setDraft({
      full_name: a.full_name,
      phone: a.phone,
      line1: a.line1,
      line2: a.line2 ?? "",
      city: a.city,
      state: a.state,
      pincode: a.pincode,
      is_default: a.is_default,
    });
    setShowForm(true);
    setError(null);
  };

  const reload = async () => {
    const { data } = await supabase.current
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: true });
    setAddresses((data as Address[]) ?? []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const sb = supabase.current;

    // Only one default at a time.
    if (draft.is_default) {
      await sb.from("addresses").update({ is_default: false }).eq("user_id", userId);
    }

    const payload = { ...draft, line2: draft.line2 || null, user_id: userId };
    const { error: opError } = editingId
      ? await sb.from("addresses").update(payload).eq("id", editingId)
      : await sb.from("addresses").insert(payload);

    setBusy(false);
    if (opError) {
      setError(opError.message);
      return;
    }
    await reload();
    resetForm();
  };

  const remove = async (id: string) => {
    await supabase.current.from("addresses").delete().eq("id", id);
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const makeDefault = async (id: string) => {
    const sb = supabase.current;
    await sb.from("addresses").update({ is_default: false }).eq("user_id", userId);
    await sb.from("addresses").update({ is_default: true }).eq("id", id);
    await reload();
  };

  const field = (key: keyof Draft) => ({
    value: draft[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setDraft((d) => ({ ...d, [key]: e.target.value })),
  });

  const inputCls =
    "w-full border border-charcoal/25 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-charcoal";

  return (
    <div>
      {/* Existing addresses */}
      {addresses.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((a) => (
            <li key={a.id} className="relative border border-charcoal/10 bg-beige/20 p-5">
              {a.is_default && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-wide2 text-gold">
                  <Star className="h-3 w-3 fill-gold" strokeWidth={0} /> Default
                </span>
              )}
              <p className="font-medium text-charcoal">{a.full_name}</p>
              <p className="mt-1 text-sm font-light leading-relaxed text-charcoal-soft">
                {a.line1}
                {a.line2 ? `, ${a.line2}` : ""}
                <br />
                {a.city}, {a.state} {a.pincode}
                <br />
                {a.phone}
              </p>
              <div className="mt-4 flex items-center gap-4 text-[12px] uppercase tracking-wide2">
                <button onClick={() => startEdit(a)} className="inline-flex items-center gap-1 text-charcoal hover:text-charcoal-soft">
                  <Pencil className="h-3.5 w-3.5" strokeWidth={1.5} /> Edit
                </button>
                {!a.is_default && (
                  <button onClick={() => makeDefault(a.id)} className="text-charcoal hover:text-charcoal-soft">
                    Set default
                  </button>
                )}
                <button onClick={() => remove(a.id)} className="inline-flex items-center gap-1 text-charcoal hover:text-red-700">
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} /> Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add new trigger */}
      {!showForm && (
        <button
          onClick={() => {
            setDraft(emptyDraft);
            setEditingId(null);
            setShowForm(true);
          }}
          className="mt-4 inline-flex items-center gap-2 border border-dashed border-charcoal/30 px-5 py-3 text-[12px] uppercase tracking-wide2 text-charcoal transition-colors hover:border-charcoal"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} /> Add new address
        </button>
      )}

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 max-w-xl border border-charcoal/10 bg-beige/20 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-serif text-xl">
              <MapPin className="h-4 w-4 text-olive" strokeWidth={1.5} />
              {editingId ? "Edit address" : "New address"}
            </h3>
            {addresses.length > 0 && (
              <button type="button" onClick={resetForm} aria-label="Cancel" className="text-olive hover:text-charcoal">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            )}
          </div>

          {error && (
            <p role="alert" className="mb-4 border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input required placeholder="Full name" className={inputCls} {...field("full_name")} />
            <input required placeholder="Phone" className={inputCls} {...field("phone")} />
            <input required placeholder="Address line 1" className={`${inputCls} sm:col-span-2`} {...field("line1")} />
            <input placeholder="Address line 2 (optional)" className={`${inputCls} sm:col-span-2`} {...field("line2")} />
            <input required placeholder="City" className={inputCls} {...field("city")} />
            <input required placeholder="State" className={inputCls} {...field("state")} />
            <input required placeholder="PIN code" inputMode="numeric" className={inputCls} {...field("pincode")} />
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm font-light text-charcoal">
            <input
              type="checkbox"
              checked={draft.is_default}
              onChange={(e) => setDraft((d) => ({ ...d, is_default: e.target.checked }))}
              className="h-4 w-4 accent-charcoal"
            />
            Set as default delivery address
          </label>

          <div className="mt-6 flex gap-3">
            <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : editingId ? "Update address" : "Save address"}
            </button>
            {addresses.length > 0 && (
              <button type="button" onClick={resetForm} className="btn-ghost">
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
