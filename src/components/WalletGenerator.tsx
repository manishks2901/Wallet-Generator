"use client";
import { mnemonicToSeedSync } from "bip39";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { ChevronsUpDown, Trash2 } from "lucide-react";
import { toast } from "sonner";
const WalletGenerator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keypair, setKeypair] = useState<Keypair[]>([]);
  const [mnemonic, setMnemonic] = useState<string>("");
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const mn_ = localStorage.getItem("mnemonic") || "";
    setMnemonic(mn_);
  }, []);
  useEffect(() => {
    const mnemonicArray = mnemonic.split(" ");
    setMnemonicWords(mnemonicArray);
  }, [mnemonic]);
  function HandleDeleteWallet(idx: number) {
    setKeypair((prevKeypairs) => {
      const newKeypairs = [...prevKeypairs];
      newKeypairs.splice(idx, 1);
      return newKeypairs;
    });
    toast(`Successfully Removed wallet:${idx + 1}`);
  }

  function GenerateWallet() {
    if (!mnemonic) {
      return;
    }
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const _keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setKeypair([...keypair, _keypair]);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center border border-blue-400/30">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full flex flex-col gap-2 transition-all duration-500"
        >
          <div className="flex items-center justify-between gap-4 px-2 mb-2">
            <h4 className="text-2xl md:text-3xl text-white font-extrabold tracking-wide">
              Your Secret Phrase
            </h4>
            <CollapsibleTrigger asChild>
              <Button
                className="size-8 bg-gradient-to-r from-blue-500 to-purple-700 hover:from-blue-600 hover:to-purple-800 text-white"
                variant="ghost"
                size="icon"
              >
                <ChevronsUpDown
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="w-full h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 p-2">
              {mnemonic
                ? mnemonicWords.map((mw, idx) => (
                    <span
                      key={idx}
                      className={`mx-1 m-1 p-2 w-full h-full flex items-center justify-center bg-gray-900/70 border border-blue-400/30 rounded-2xl text-base md:text-lg text-blue-200 font-semibold transition-all duration-300 animate-fade-in font-mono shadow fade-in-delay-${idx}`}
                    >
                      {mw}
                    </span>
                  ))
                : null}
            </div>
          </CollapsibleContent>
          <style jsx global>{`
            @keyframes fade-in {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fade-in {
              animation: fade-in 0.4s both;
            }
            ${mnemonicWords.map((_, idx) => `.fade-in-delay-${idx} { animation-delay: ${idx * 50}ms !important; }`).join('\n')}
          `}</style>
        </Collapsible>
        <Button
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-700 hover:from-blue-600 hover:to-purple-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200 border-none"
          onClick={GenerateWallet}
        >
          Generate Wallet
        </Button>
        <div className="w-full mt-8 space-y-6">
          {keypair && keypair.length > 0
            ? keypair.map((key, idx) => (
                <div key={idx} className="">
                    <Card className="bg-white/10 backdrop-blur-md border border-blue-400/30 shadow-lg rounded-xl">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-gray-900 font-bold">
                      Wallet {idx + 1}
                      </CardTitle>
                      <CardDescription className="text-gray-800 flex flex-col gap-1">
                      <span className="font-semibold">Public Key:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono break-all text-gray-700 text-xs md:text-sm select-all">
                        {key.publicKey.toBase58()}
                        </span>
                        <Button
                        size="icon"
                        variant="ghost"
                        className="p-1 text-gray-700 hover:bg-blue-500/20"
                        onClick={() => {
                          navigator.clipboard.writeText(key.publicKey.toBase58());
                          toast("Public key copied!");
                        }}
                        >
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                          <rect x="4" y="4" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                          <rect x="2.5" y="2.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
                        </svg>
                        </Button>
                      </div>
                      </CardDescription>
                      <CardAction>
                      <Button
                        onClick={() => HandleDeleteWallet(idx)}
                        className="bg-red-600/80 hover:bg-red-800 text-white ml-2"
                        size="icon"
                      >
                        <Trash2 />
                      </Button>
                      </CardAction>
                    </CardHeader>
                    <CardFooter className="pt-0 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-700 break-all font-mono select-all">
                        Private Key: {bs58.encode(key.secretKey)}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-1 text-gray-700 hover:bg-blue-500/20"
                        onClick={() => {
                        navigator.clipboard.writeText(bs58.encode(key.secretKey));
                        toast("Private key copied!");
                        }}
                      >
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <rect x="4" y="4" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                        <rect x="2.5" y="2.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
                        </svg>
                      </Button>
                      </div>
                    </CardFooter>
                    </Card>
                </div>
              ))
            : null}
        </div>
        <div className="mt-8 text-xs text-blue-300 text-center w-full">
          Powered by Next.js, Solana Web3.js, and the future of decentralized
          tech.
        </div>
      </div>
    </main>
  );
};

export default WalletGenerator;
