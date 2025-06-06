"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const WalletAdapter = () => {
  const router = useRouter();
  return (
    <>
    <div className="flex justify-center items-center min-h-[60vh] w-full">
      <Card className="bg-white/10 backdrop-blur-md border border-blue-400/30 shadow-lg rounded-2xl p-10 max-w-md w-full flex flex-col items-center min-h-[370px] mb-8">
        <CardHeader className="w-full p-0 mb-4">
          <CardTitle className="text-center text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-wide">
            Wallet Adapter Actions
          </CardTitle>
          
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center">
          <p className="text-blue-200 mb-8 text-center">
            Choose an action to interact with your Solana wallet.
          </p>
          <div className="flex flex-col gap-4 w-full">
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200 border-none"
              onClick={() => router.push("/walletadapter/airdrop")}
            >
              Airdrop Solana
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200 border-none"
              onClick={() => router.push("/walletadapter/signmessage")}
            >
              Sign Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default WalletAdapter;