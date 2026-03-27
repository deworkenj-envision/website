import crypto from "crypto";
export function generateCsrfToken() { return crypto.randomBytes(24).toString("hex"); }
export function validateCsrf(requestToken: string | null, cookieToken: string | null) {
  return Boolean(requestToken && cookieToken && requestToken === cookieToken);
}
