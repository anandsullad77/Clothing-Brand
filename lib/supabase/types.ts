// App-level shapes for the Supabase tables. These mirror supabase/schema.sql.
// (You can later replace these with generated types via `supabase gen types`.)

export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  updated_at: string | null;
};

export type Address = {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
  created_at: string;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  size: string;
};

export type Order = {
  id: string;
  user_id: string;
  status: OrderStatus;
  total: number;
  created_at: string;
  order_items?: OrderItem[];
};

export type WishlistRow = {
  user_id: string;
  product_id: string;
  created_at: string;
};
