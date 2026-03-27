export type CtaVariant = "order-now" | "get-started";
export function normalizeVariant(input?: string): CtaVariant { return input === "get-started" ? "get-started" : "order-now"; }
export function chooseCtaLabel(variant: CtaVariant) { return variant === "get-started" ? "Get Started" : "Order Now"; }
