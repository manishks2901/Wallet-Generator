"use client"
import { Input } from "@/components/ui/input";
import { useWallet } from "@solana/wallet-adapter-react";
import { ed25519 } from "@noble/curves/ed25519"
import { toast } from "sonner";
import bs58 from 'bs58';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
const SignMessage = () => {
    const { publicKey , signMessage }  = useWallet();
    const [signature, setSignature] = useState<string>("");
    async function HandleSignMessage(){
        try{
            if(!publicKey) throw new Error("Wallet Are not Connected")
            if(!signMessage) throw new Error("Wallet does not support message signing")
            const message = document.getElementById('message') as HTMLInputElement | null;
            if(message){
                const encodeMessage = new TextEncoder().encode(message.value)
                const signatureBytes = await signMessage(encodeMessage)
                if(!ed25519.verify(signatureBytes,encodeMessage,publicKey.toBytes())) throw new Error("Signature message Invalid")
                const sig = bs58.encode(signatureBytes);
                setSignature(sig);
                toast(`Success Message signature :${sig}`)
            }
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                toast(error.message)
            } else {
                toast("An unknown error occurred")
            }
        }
    }
    return ( 
        <div className="flex justify-center items-center min-h-[60vh] w-full">
            <Card className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center border border-blue-400/30 mb-8 min-h-[370px]">
                <CardHeader className="w-full p-0 mb-4">
                    <CardTitle className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-wide text-center">
                        Sign Message
                    </CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center">
                    <p className="text-blue-200 mb-8 text-center">
                        Sign a message with your connected Solana wallet to prove ownership or interact with dApps securely.
                    </p>
                    <Input id="message" type="text" placeholder="Enter your message" className="bg-gray-800/60 text-blue-200 border border-blue-400/30 focus:ring-2 focus:ring-blue-500 placeholder:text-blue-300 rounded-lg px-4 py-2 mb-4 w-full" />
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-700 hover:from-blue-600 hover:to-purple-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-all duration-200 border-none" onClick={HandleSignMessage}>
                        Sign Message
                    </Button>
                    {signature && (
                        <div className="mt-6 w-full">
                            <label className="block text-blue-100 mb-2">Message Signature</label>
                            <div className="bg-gray-800 text-blue-200 rounded-lg px-4 py-2 break-all font-mono text-xs border border-blue-400/30">
                                {signature}
                            </div>
                        </div>
                    )}
                    <div className="mt-8 text-xs text-blue-300 text-center w-full">
                        Powered by Solana Wallet Adapter and the future of decentralized tech.
                    </div>
                </CardContent>
            </Card>
        </div>
     );
}
 
export default SignMessage;