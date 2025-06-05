"use client"
import { ModeToggle } from "@/components/ToggleDarkLight";
import { useRouter } from "next/navigation"



export default function Home() {
  const router = useRouter()
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col items-center justify-center p-6">
      <div className="absolute top-6 right-6">
      <ModeToggle />
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center border border-blue-400/30">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-wide text-center">
        Futuristic Web3 Wallet Generator
      </h1>
      <p className="text-blue-200 mb-8 text-center">
        Instantly generate a secure, non-custodial wallet. Your keys, your crypto, your future.
      </p>
      <div className="flex flex-col gap-4 w-full">
        <label className="block text-blue-100 mb-2 text-center text-lg font-semibold">
          Select Blockchain
        </label>
        <div className="flex justify-center gap-4 mb-2">
          <button
        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200"
        onClick={() => router.push('/seed/solana')}
          >
            Solana
          </button>
          <button
        className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200"
        // onClick={() => handleGenerateWallet('solana')}
          >
        Etherium
          </button>
        </div>
      </div>
      {/* 
        Display wallet address, mnemonic, QR code, etc. here after generation.
        Example:
        <div className="mt-6 w-full">
        <label className="block text-blue-100 mb-2">Wallet Address</label>
        <div className="bg-gray-800 text-blue-200 rounded-lg px-4 py-2 break-all font-mono">0x...</div>
        </div>
      */}
      <div className="mt-8 text-xs text-blue-300 text-center">
        Powered by Next.js, Ethers.js, and the future of decentralized tech.
      </div>
      </div>
      
    </main>
  );
}
