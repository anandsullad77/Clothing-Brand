// Centralised price formatting so the whole store shares one currency.
// Indian Rupee, with Indian digit grouping (e.g. ₹1,49,000) and no decimals.
const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatPrice = (amount: number): string => inr.format(amount);

/** Order subtotal above which shipping is free (in ₹). */
export const FREE_SHIPPING_THRESHOLD = 10000;
