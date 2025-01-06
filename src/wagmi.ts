import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { defineChain } from "viem";

// https://dev-preview.lens.xyz/docs/network/using-lens-network
const lensTestnet = defineChain({
  id: 37_111,
  name: "Lens Network Sepolia Testnet",
  nativeCurrency: { name: "Lens Sepolia Ether", symbol: "GRASS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.lens.dev"],
    },
  },
  blockExplorers: {
    default: {
      name: "Lens Testnet",
      url: "https://block-explorer.testnet.lens.dev",
      apiUrl: "https://block-explorer.testnet.lens.dev/api",
    },
  },
  testnet: true,
});

export const config = createConfig(
  getDefaultConfig({
    chains: [sepolia, lensTestnet],
    connectors: [
      injected(),
      coinbaseWallet(),
      walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
    ],
    transports: {
      // RPC URL for each chain
      [sepolia.id]: http(),
      [lensTestnet.id]: http(),
    },
    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",

    // Required App Info
    appName: "Your App Name",
    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
