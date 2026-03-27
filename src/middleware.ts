import { NextRequest, NextResponse } from "next/server";
function chooseVariant(seed: string) {
  let total = 0; for (let i = 0; i < seed.length; i++) total += seed.charCodeAt(i);
  return total % 2 === 0 ? "order-now" : "get-started";
}
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (!req.cookies.get("plx_cta_variant")) {
    const seed = `${req.ip ?? "0.0.0.0"}:${req.headers.get("user-agent") ?? "ua"}`;
    res.cookies.set("plx_cta_variant", chooseVariant(seed), { httpOnly: false, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  }
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return res;
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
