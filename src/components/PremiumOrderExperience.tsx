'use client';
import { useMemo, useState } from "react";
import { chooseCtaLabel, type CtaVariant } from "@/lib/ab-tests";
import { usePricing } from "@/hooks/usePricing";
export function PremiumOrderExperience({ slug, ctaVariant }: { slug: string; ctaVariant: CtaVariant; }) {
  const [size, setSize] = useState("3.5x2");
  const [material, setMaterial] = useState("16pt Matte");
  const [finish, setFinish] = useState("Soft Touch");
  const [turnaround, setTurnaround] = useState("Standard");
  const [quantity, setQuantity] = useState(500);
  const input = useMemo(() => ({ slug, size, material, finish, turnaround, quantity }), [slug, size, material, finish, turnaround, quantity]);
  const { data, loading } = usePricing(input);
  const totalPrice = data?.pricing.totalPrice ?? 0;
  const cta = chooseCtaLabel(ctaVariant);
  return (
    <div style={{display:"grid", gap:24, gridTemplateColumns:"1.1fr 0.9fr"}}>
      <section style={{background:"#fff", borderRadius:24, padding:24, boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
        <div style={{fontSize:12, textTransform:"uppercase", letterSpacing:"0.2em", color:"#777"}}>Premium ordering</div>
        <h2 style={{fontSize:36, margin:"10px 0 24px"}}>Configure your order</h2>
        <div style={{display:"grid", gap:16, gridTemplateColumns:"1fr 1fr"}}>
          {[
            ["Size", size, setSize, ["3.5x2", "square", "slim"]],
            ["Material", material, setMaterial, ["16pt Matte", "32pt Silk", "Cotton"]],
            ["Finish", finish, setFinish, ["Matte", "Soft Touch", "Spot UV"]],
            ["Turnaround", turnaround, setTurnaround, ["Standard", "Rush", "Same Day"]],
          ].map(([label, value, setter, options]) => (
            <label key={label as string} style={{display:"block"}}>
              <span style={{display:"block", marginBottom:8, fontSize:14, color:"#666"}}>{label as string}</span>
              <select style={{width:"100%", borderRadius:16, border:"1px solid #ddd", padding:"14px 16px", background:"#fff"}} value={value as string} onChange={(e) => (setter as (v: string) => void)(e.target.value)}>
                {(options as string[]).map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          ))}
          <label style={{display:"block", gridColumn:"1 / -1"}}>
            <span style={{display:"block", marginBottom:8, fontSize:14, color:"#666"}}>Quantity</span>
            <select style={{width:"100%", borderRadius:16, border:"1px solid #ddd", padding:"14px 16px", background:"#fff"}} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
              {[100, 250, 500, 1000].map((option) => <option key={option} value={option}>{option.toLocaleString()}</option>)}
            </select>
          </label>
        </div>
        {data?.upsells?.length ? (
          <div style={{marginTop:24}}>
            <div style={{fontWeight:700, marginBottom:12}}>Suggested upgrades</div>
            <div style={{display:"grid", gap:10}}>
              {(data.upsells as {label:string;price:number}[]).map((u, idx) => <div key={idx} style={{background:"#f8f8f8", borderRadius:16, padding:14}}>{u.label} — ${u.price}</div>)}
            </div>
          </div>
        ) : null}
        <div style={{display:"flex", gap:12, marginTop:24}}>
          <button style={{background:"#111", color:"#fff", padding:"14px 20px", borderRadius:16, border:0}}>{cta}</button>
          <button style={{border:"1px solid #ddd", background:"#fff", padding:"14px 20px", borderRadius:16}}>Continue to design</button>
        </div>
      </section>
      <aside style={{background:"#f5f5f5", borderRadius:24, padding:24}}>
        <div style={{fontSize:12, textTransform:"uppercase", letterSpacing:"0.2em", color:"#777"}}>Live pricing</div>
        <h3 style={{fontSize:28, margin:"10px 0 20px"}}>Order summary</h3>
        <div style={{background:"#fff", borderRadius:24, padding:24}}>
          <div style={{fontSize:14, color:"#666"}}>{loading ? "Updating price..." : "Estimated total"}</div>
          <div style={{fontSize:48, fontWeight:700, marginTop:8}}>${totalPrice.toFixed(2)}</div>
          <div style={{fontSize:14, color:"#666", marginTop:10}}>V15 includes pricing, checkout, uploads, shipping, proofs, and deployment scaffolding.</div>
        </div>
      </aside>
    </div>
  );
}
