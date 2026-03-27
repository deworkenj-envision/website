'use client';
import { useState } from "react";
export function AdvancedEditor() {
  const [side, setSide] = useState<"front" | "back">("front");
  return (
    <div style={{background:"#fff", borderRadius:24, padding:24, boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16}}>
        <h3 style={{margin:0, fontSize:28}}>Advanced editor scaffold</h3>
        <div style={{display:"flex", gap:8}}>
          <button onClick={() => setSide("front")} style={{padding:"10px 14px", borderRadius:12, border:"1px solid #ddd", background:"#fff"}}>Front</button>
          <button onClick={() => setSide("back")} style={{padding:"10px 14px", borderRadius:12, border:"1px solid #ddd", background:"#fff"}}>Back</button>
        </div>
      </div>
      <div style={{border:"2px dashed #ccc", borderRadius:16, padding:50, color:"#666"}}>
        Current side: {side}. Replace with your Fabric.js editor and export/save hooks.
      </div>
    </div>
  );
}
