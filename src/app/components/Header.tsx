'use client';

import { Flex, Box, Text, Button, Spacer } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";

export default function Header() {
    return (
        <Flex flexDirection="row" width="100vw">
            <Box>
                <Text>In the loop</Text>
            </Box>
            <Spacer />
            <ConnectKitButton.Custom>
                {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                    return (
                        <Button onClick={show}>
                            {isConnected ? address : "Custom Connect"}
                        </Button>
                    );
                }}
            </ConnectKitButton.Custom>
        </Flex >
    )
}   