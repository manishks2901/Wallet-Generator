"use client";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center flex-col justify-center">
      <ConnectionProvider endpoint="https://api.devnet.solana.com">
        <WalletProvider wallets={[]}>
          <WalletModalProvider>
            <div className="">
              <span className="text-2xl font-bold">Connect Wallet :</span>
              <WalletMultiButton className="w-full mb-2" />
            </div>

            {children}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default Layout;
