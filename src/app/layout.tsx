import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Wrapper from "@/components/Wrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Futuristic Web3 Wallet Generator",
  description:
    "A modern, glassmorphic, and vibrant app to generate secure, non-custodial wallets for Solana and Ethereum. Your keys, your crypto, your future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body

        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <Wrapper>
        {children}
       </Wrapper>
      </body>
      
    </html>
  );
}
