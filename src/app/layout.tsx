// React
import React from "react";

// NextJS
import Script from "next/script";

// Vercel
import { Analytics } from "@vercel/analytics/react";

// CSS
import "@/app/globals.css";

// Components
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Chess Coven",
  description: "Chess learning tools and games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-K97HLBR0H0"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-K97HLBR0H0', {
                page_path: window.location.pathname,
              });
            `,
        }}
      />
      <body className="bg-forest bg-forest-bottom bg-top bg-no-repeat font-body text-white">
        <Analytics />
        <div className="flex min-h-screen flex-col">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
