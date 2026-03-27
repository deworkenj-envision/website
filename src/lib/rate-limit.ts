import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
  : null;
const memory = new Map<string, { count: number; resetAt: number }>();
export async function rateLimit(req: NextRequest, opts?: { limit?: number; windowSec?: number }) {
  const limit = opts?.limit ?? 60;
  const windowSec = opts?.windowSec ?? 60;
  const key = req.headers.get("x-forwarded-for") || "local";
  if (redis) {
    const redisKey = `rl:${key}`;
    const current = await redis.incr(redisKey);
    if (current === 1) await redis.expire(redisKey, windowSec);
    return { ok: current <= limit, current, limit };
  }
  const now = Date.now();
  const hit = memory.get(key);
  if (!hit || now > hit.resetAt) { memory.set(key, { count: 1, resetAt: now + windowSec * 1000 }); return { ok: true, current: 1, limit }; }
  hit.count += 1;
  return { ok: hit.count <= limit, current: hit.count, limit };
}
