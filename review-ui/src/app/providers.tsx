// app/providers.tsx
"use client";
import * as React from "react";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { MetaMaskContextProvider } from "../hooks/useMetaMask";

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

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <MetaMaskContextProvider>{children}</MetaMaskContextProvider>
    </ChakraProvider>
  );
}
