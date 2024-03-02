// app/providers.tsx
"use client";
import * as React from "react";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const theme = extendTheme({
  components: {
    Button: {
      sizes: {
        "2xl": {
          h: "80px",
          fontSize: "2xl",
          px: "40px",
        },
      },
    },
  },
});

// const config = createConfig(
//   getDefaultConfig({
//     // Required API Keys
//     alchemyId: process.env.ALCHEMY_API_KEY, // or infuraId
//     walletConnectProjectId: "demo",

//     // Required
//     appName: "You Create Web3 Dapp",

//     // Optional
//     appDescription: "Your App Description",
//     appUrl: "https://family.co", // your app's url
//     appIcon: "https://family.co/logo.png", // your app's logo,no bigger than 1024x1024px (max. 1MB)
//   })
// );

const newSepolia = {
  ...sepolia,
  rpcUrls: {
    default: { http: ['https://sepolia.gateway.pokt.network/v1/lb/e25b945d'] },
  },
};

const config = getDefaultConfig({
  appName: "In The Loop",
  projectId: "b4ea7572dbfd1001a2436a052c2364c0",
  chains: [newSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});


const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider initialChain={sepolia}>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}
