import type { Variants } from "framer-motion";

// A soft, expensive-feeling cubic-bezier ease used across the experience.
export const silk: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: silk },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: silk } },
};

// Parent that staggers its children's entrance.
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

// Image clip reveal (curtain-style wipe).
export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 1.2, ease: silk },
  },
};

// Shared viewport config so reveals fire once, slightly before fully in view.
// `as const` keeps `margin` a literal so it satisfies Framer Motion's template-literal type.
export const viewportOnce = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -10% 0px",
} as const;
