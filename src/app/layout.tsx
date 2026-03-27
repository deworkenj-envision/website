import type { ReactNode } from "react";

export const metadata = {
  title: "PrintLux V15",
  description: "Final launch-ready premium print platform starter",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}