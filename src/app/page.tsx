"use client";

import WalletAdapter from "@/components/WalletAdapterCard";
import WalletGeneratorCard from "@/components/WalletGeneratorCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-6">
      <div className="flex justify-center gap-4">
        <WalletGeneratorCard />
        <WalletAdapter />
      </div>
    </main>
  );
}
