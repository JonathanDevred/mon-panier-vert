"use client";

import { useEffect } from "react";
import { initializeLocalStorage } from "./utils/localStorageUtils";
import { CartProvider } from "./utils/CartContext.tsx";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    initializeLocalStorage();
  }, []);

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
