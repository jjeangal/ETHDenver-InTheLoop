'use client';

import { Flex, Box, Text } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";

export default function Header() {
    return (
        <Flex flexDirection="row">
            <Box>
                <Text>In the loop</Text>
            </Box>
            <ConnectKitButton.Custom>
                {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                    return (
                        <button onClick={show}>
                            {isConnected ? address : "Custom Connect"}
                        </button>
                    );
                }}
            </ConnectKitButton.Custom>
        </Flex>
    )
}   