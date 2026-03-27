export default function CheckoutSuccessPage() {
  return <main style={{maxWidth: 900, margin: "0 auto", padding: 24}}><div style={{background:"#fff", padding:32, borderRadius:24}}><h1>Payment successful</h1><p>Your order was received. The Stripe webhook should move the order into review.</p></div></main>;
}
