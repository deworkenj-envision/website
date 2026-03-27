const EASYPOST_API_KEY = process.env.EASYPOST_API_KEY;
async function easypostRequest(path: string, init?: RequestInit) {
  if (!EASYPOST_API_KEY) throw new Error("Missing EASYPOST_API_KEY");
  const response = await fetch(`https://api.easypost.com/v2${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${EASYPOST_API_KEY}`, "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json?.error?.message || "EasyPost request failed");
  return json;
}
export async function createShipmentQuote(payload: unknown) {
  return easypostRequest("/shipments", { method: "POST", body: JSON.stringify(payload) });
}
export async function trackShipment(trackingCode: string, carrier: string) {
  return easypostRequest("/trackers", { method: "POST", body: JSON.stringify({ tracker: { tracking_code: trackingCode, carrier } }) });
}
