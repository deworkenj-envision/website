const allowedMime = new Set(["image/jpeg","image/png","image/webp","application/pdf","image/svg+xml"]);
export function validateUploadMeta(file: { type: string; size: number }) {
  if (!allowedMime.has(file.type)) throw new Error("Unsupported file type");
  if (file.size > 20 * 1024 * 1024) throw new Error("File too large");
  return true;
}
