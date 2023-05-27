// React
import React from "react";

// Vercel
import { Analytics } from "@vercel/analytics/react";

// CSS
import "@/app/globals.css";

// Components
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Tactical Elements",
  description: "Chess learning tools and games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 bg-forest bg-cover font-body text-white">
        <div className="flex h-full flex-col min-h-screen">
          {children}
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
