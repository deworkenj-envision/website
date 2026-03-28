'use client';

import { useEffect, useMemo, useRef, useState } from "react";

type Input = {
  slug: string;
  size: string;
  material: string;
  finish: string;
  turnaround: string;
  quantity: number;
};

const localCache = new Map<
  string,
  { pricing: { totalPrice: number; unitPrice: number }; upsells?: unknown[] }
>();

export function usePricing(input: Input) {
  const [data, setData] = useState<{
    pricing: { totalPrice: number; unitPrice: number };
    upsells?: unknown[];
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const key = useMemo(() => JSON.stringify(input), [input]);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(async () => {
      try {
        setError(null);

        const cached = localCache.get(key);
        if (cached) {
          setData(cached);
          return;
        }

        setLoading(true);

        const res = await fetch("/api/pricing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || "Pricing failed");
        }

        localCache.set(key, json);
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [key, input]);

  return { data, loading, error };
}