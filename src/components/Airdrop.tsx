"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import "@solana/wallet-adapter-react-ui/styles.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const AirdropSol = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);

  async function RequestAirdrop() {
    const amountInput = document.getElementById(
      "amount"
    ) as HTMLInputElement | null;
    if (!amountInput) return;
    const amount = parseFloat(amountInput.value);
    if (!wallet.publicKey || isNaN(amount) || amount <= 0) {
      toast("Please connect your wallet and enter a valid amount.");
      return;
    }
    try {
      await connection.requestAirdrop(
        wallet.publicKey,
        amount * LAMPORTS_PER_SOL
      );
      toast(`Airdrop ${amount} SOL to ${wallet.publicKey.toBase58()}`);
    } catch (error) {
      toast("Airdrop failed: " + (error as Error).message);
    }
  }
  useEffect(() => {
    (async () => {
      if (wallet.publicKey) {
        const balance_ = await connection.getBalance(wallet.publicKey);
        setBalance(balance_ / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, connection]);

  return (
    <div className="flex justify-center items-center min-h-[60vh] w-full">
      <Card className="bg-white/10 w-[650px] backdrop-blur-md rounded-2xl shadow-2xl p-10  flex flex-col items-center border border-blue-400/30 mb-8 min-h-[370px]">
        <CardHeader className="w-full p-0 mb-4">
          <CardTitle className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-wide text-center">
            Solana Airdrop
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center">
          <p className="text-blue-200 mb-8 text-center">
            Instantly request SOL airdrop to your connected wallet for testing
            and development.
          </p>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-around items-center">
              <div className="w-full h-6 ml-3">
                <p className="text-sm font-semibold">
                  Current Balance : {balance}
                </p>
              </div>
            </div>
            <Input
              id="amount"
              type="text"
              placeholder="Enter the amount of SOL you want"
              className="bg-gray-800/60 text-blue-200 border border-blue-400/30 focus:ring-2 focus:ring-blue-500 placeholder:text-blue-300 rounded-lg px-4 py-2 mb-2"
            />
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-700 hover:from-blue-600 hover:to-purple-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200 border-none"
              onClick={RequestAirdrop}
            >
              Request Airdrop
            </Button>
          </div>
          <div className="mt-8 text-xs text-blue-300 text-center w-full">
            Powered by Solana Devnet, Wallet Adapter, and the future of
            decentralized tech.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AirdropSol;
