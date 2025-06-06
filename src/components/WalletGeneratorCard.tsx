import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const WalletGeneratorCard = () => {
  const router = useRouter();
  return (
    <Card className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center border border-blue-400/30 mb-8 h-[450px]">
      <CardHeader className="w-full p-0 mb-4">
        <CardTitle className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-wide text-center">
          Futuristic Web3 Wallet Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-center">
        <p className="text-blue-200 mb-8 text-center">
          Instantly generate a secure, non-custodial wallet. Your keys, your
          crypto, your future.
        </p>
        <div className="flex flex-col gap-4 w-full">
          <label className="block text-blue-100 mb-2 text-center text-lg font-semibold">
            Select Blockchain
          </label>
          <div className="flex justify-center gap-4 mb-2">
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200"
              onClick={() => router.push("/seed/solana")}
            >
              Solana
            </button>
            <button
              className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200"
              // TODO:add login for etherium
            >
              Etherium
            </button>
          </div>
        </div>
        <div className="mt-8 text-xs text-blue-300 text-center">
          Powered by Next.js, Ethers.js, and the future of decentralized tech.
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletGeneratorCard;
