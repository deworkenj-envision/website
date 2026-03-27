export default function HomePage() {
  return (
    <main style={{maxWidth: 1120, margin: "0 auto", padding: 32}}>
      <div style={{background: "#fff", borderRadius: 24, padding: 40, boxShadow: "0 1px 10px rgba(0,0,0,0.05)"}}>
        <div style={{display:"inline-block", background:"#f1f1f1", borderRadius:999, padding:"6px 12px", fontSize:12, textTransform:"uppercase"}}>PrintLux V15</div>
        <h1 style={{fontSize:56, margin:"16px 0 12px"}}>Launch-ready premium print platform.</h1>
        <p style={{maxWidth: 760, fontSize: 18, lineHeight: 1.6, color: "#555"}}>V15 is the cleanest, most complete generated package in this session, with pricing, checkout, uploads, shipping, proof approval, admin scaffolds, and deployment helpers.</p>
        <div style={{display:"flex", gap:12, marginTop:28}}>
          <a href="/products/premium-business-cards" style={{background:"#111", color:"#fff", padding:"14px 20px", borderRadius:16}}>Open product page</a>
          <a href="/admin" style={{border:"1px solid #ddd", padding:"14px 20px", borderRadius:16}}>Open admin</a>
        </div>
      </div>
    </main>
  );
}
