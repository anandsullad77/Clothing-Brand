"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createClient } from "@/lib/supabase/client";

type WishlistContextValue = {
  ids: string[];
  count: number;
  ready: boolean;
  isSignedIn: boolean;
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "nissi-wishlist";

function readLocal(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const supabase = useRef(createClient());
  const [ids, setIds] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Load the wishlist: from Supabase when signed in, else from localStorage.
  // On sign-in, merge any local wishlist into the account.
  useEffect(() => {
    const sb = supabase.current;
    let active = true;

    const load = async (uid: string | null) => {
      if (!uid) {
        if (active) {
          setUserId(null);
          setIds(readLocal());
          setReady(true);
        }
        return;
      }

      const local = readLocal();
      if (local.length) {
        // Merge local picks into the account, then clear local.
        await sb
          .from("wishlist")
          .upsert(
            local.map((product_id) => ({ user_id: uid, product_id })),
            { onConflict: "user_id,product_id" }
          );
        writeLocal([]);
      }

      const { data } = await sb
        .from("wishlist")
        .select("product_id")
        .eq("user_id", uid);

      if (active) {
        setUserId(uid);
        setIds((data ?? []).map((r) => r.product_id as string));
        setReady(true);
      }
    };

    sb.auth.getUser().then(({ data }) => load(data.user?.id ?? null));

    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      load(session?.user?.id ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const toggle = useCallback(
    (productId: string) => {
      setIds((prev) => {
        const exists = prev.includes(productId);
        const next = exists
          ? prev.filter((id) => id !== productId)
          : [...prev, productId];

        if (userId) {
          const sb = supabase.current;
          if (exists) {
            void sb
              .from("wishlist")
              .delete()
              .eq("user_id", userId)
              .eq("product_id", productId);
          } else {
            void sb
              .from("wishlist")
              .upsert(
                { user_id: userId, product_id: productId },
                { onConflict: "user_id,product_id" }
              );
          }
        } else {
          writeLocal(next);
        }
        return next;
      });
    },
    [userId]
  );

  const value = useMemo<WishlistContextValue>(
    () => ({
      ids,
      count: ids.length,
      ready,
      isSignedIn: Boolean(userId),
      has: (productId: string) => ids.includes(productId),
      toggle,
    }),
    [ids, ready, userId, toggle]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
