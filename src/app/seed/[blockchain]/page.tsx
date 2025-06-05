"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateMnemonic } from "bip39";
import {  useState } from "react";
import { useRouter } from "next/navigation";

const Blockchain = () => {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [inputMnemonic, setInputMnemonic] = useState<string>("");
  const router = useRouter()
  function handleGenerateSeed() {
    if (inputMnemonic.trim()) {
      localStorage.setItem("mnemonic", inputMnemonic.trim());
      setMnemonic(inputMnemonic.trim());
    } else {
      const mn = generateMnemonic();
      setMnemonic(mn);
      localStorage.setItem("mnemonic", mn);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center border border-blue-400/30">
        <CardHeader className="w-full p-0 mb-4">
          <CardTitle className="text-center text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-wide">
            Seed Phrase Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full p-0">
          <div className="space-y-4 w-full">
            <Input
              id="Mnemonic"
              placeholder="Paste your seed phrase or leave blank to generate new"
              value={inputMnemonic}
              onChange={(e) => setInputMnemonic(e.target.value)}
              className="mb-2 bg-gray-800/60 text-blue-200 border border-blue-400/30 focus:ring-2 focus:ring-blue-500 placeholder:text-blue-300 rounded-lg px-4 py-2"
            />
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-700 hover:from-blue-600 hover:to-purple-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200 border-none" onClick={handleGenerateSeed}>
              {inputMnemonic.trim() ? "Save Seed" : "Generate Seed"}
            </Button>
            {mnemonic && (
              <div className="mt-4 rounded bg-gray-900/70 p-4 text-center text-base text-blue-200 border border-blue-400/30 shadow-inner">
                <div className="font-semibold mb-1 text-blue-100">Your Seed Phrase:</div>
                <div className="break-words font-mono text-blue-300">{mnemonic}</div>
              </div>
            )}
            <Button
              className="w-full mt-2 bg-gradient-to-r from-purple-500 to-blue-700 hover:from-purple-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200 border-none"
              disabled={!mnemonic}
              onClick={() => {

                router.push(`${window.location.pathname}/walletgenerator`)
              }}
            >
              Generate Wallet
            </Button>
          </div>
        </CardContent>
        <div className="mt-8 text-xs text-blue-300 text-center w-full">
          Powered by Next.js, bip39, and the future of decentralized tech.
        </div>
      </div>
    </main>
  );
};

export default Blockchain;
