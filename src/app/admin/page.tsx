export default function AdminPage() {
  return (
    <main style={{maxWidth: 1120, margin: "0 auto", padding: 24}}>
      <h1 style={{fontSize: 36, marginBottom: 20}}>Admin dashboard scaffold</h1>
      <div style={{display:"grid", gridTemplateColumns:"repeat(3, minmax(0, 1fr))", gap:16}}>
        {["Products", "Orders", "Bundles"].map((item) => <div key={item} style={{background:"#fff", borderRadius:20, padding:24, boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}><h2 style={{marginTop:0}}>{item}</h2><p style={{color:"#666"}}>Starter panel for {item.toLowerCase()} management.</p></div>)}
      </div>
    </main>
  );
}
