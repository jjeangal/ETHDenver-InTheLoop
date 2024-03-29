'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { ReactNode } from 'react';

export const config = createConfig(
    getDefaultConfig({
        chains: [sepolia],
        transports: {
            [sepolia.id]: http(
                process.env.NEXT_PUBLIC_RPC_PROVIDER_URL ??
                'https://rpc.ankr.com/eth_sepolia'
            ),
        },
        ssr: true,
        walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
        appName: 'In The Loop',
    })
);

const queryClient = new QueryClient();

const theme = extendTheme({
    fonts: {
        heading: "Montserrat, sans-serif",
        body: "Montserrat, sans-serif"
    },
});

export const Web3Provider = ({ children }: { children: ReactNode }) => {
    return (
        <ChakraProvider theme={theme}>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <ConnectKitProvider>
                        {children}
                    </ConnectKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </ChakraProvider>
    );
};