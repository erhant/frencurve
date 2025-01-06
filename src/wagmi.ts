import { http, createConfig } from "wagmi";
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
    chains: [lensTestnet],
    connectors: [
      injected(),
      coinbaseWallet(),
      walletConnect({ projectId: "" }),
    ],
    transports: {
      [lensTestnet.id]: http(),
    },

    walletConnectProjectId: "",

    appName: "Frencurve",
    appDescription: "Make frens on elliptic curves.",
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png",
  })
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
