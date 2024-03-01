// app/providers.tsx
"use client";
import * as React from "react";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";
import { MetaMaskContextProvider } from "../../hooks/useMetaMask";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

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

console.log("infura " + process.env.INFURA_API_KEY);
export const config = createConfig({
  chains: [sepolia],
  connectors: [
    metaMask({
      dappMetadata: {
        name: "In The Loop",
      },
      infuraAPIKey: process.env.INFURA_API_KEY,
    }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig config={config}>
        {/* <MetaMaskContextProvider> */}
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        {/* </MetaMaskContextProvider> */}
      </WagmiConfig>
    </ChakraProvider>
  );
}
