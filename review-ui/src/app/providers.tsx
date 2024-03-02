// app/providers.tsx
"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { WagmiProvider, cookieStorage, createConfig, createStorage, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

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

const sepoliaFromPrivateEndpoint = {
  ...sepolia,
  rpcUrls: {
    default: { http: ["https://sepolia.gateway.pokt.network/v1/lb/e25b945d"] },
  },
};

const config = createConfig({
  chains: [sepoliaFromPrivateEndpoint],
  connectors: [
    metaMask(),
  ],
  transports: {
    [sepoliaFromPrivateEndpoint.id]: http(),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

const queryClient = new QueryClient();

const sdkOptions = {
  logging: { developerMode: false },
  checkInstallationImmediately: false, 
  dappMetadata: {
    name: "In The Loop",
    url: typeof window !== "undefined" ? window.location.host : undefined,
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiProvider config={config}>
        <MetaMaskUIProvider sdkOptions={sdkOptions} networks={[sepoliaFromPrivateEndpoint]}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </MetaMaskUIProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}
