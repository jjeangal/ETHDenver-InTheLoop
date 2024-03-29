'use client';

import Link from 'next/link'
import { Text, Button, Spacer, VStack, useColorModeValue } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import { Box } from "@chakra-ui/react";

export default function Side() {
    const borderColor = useColorModeValue("gray.200", "gray.700");

    function transformAddress(address: `0x${string}` | undefined): string {
        if (address === undefined) {
            return "Connect";
        }
        if (address.length <= 6) {
            return address;
        }
        return address.slice(0, 4) + '...' + address.slice(-2);
    }

    return (
        <Box width="12vw">
            <VStack as="nav" position="fixed" width="12vw" left={0} top={0} bottom={0} spacing={8} borderRight="1px" borderColor={borderColor}>
                <Spacer />
                <Text size="xxl">
                    <Link href="/">
                        HOME
                    </Link>
                </Text>
                <Text>
                    <Link href="/profile">
                        PROFILE
                    </Link>
                </Text>
                <Text>
                    <Link href="/uploadsong">
                        UPLOAD
                    </Link>
                </Text>
                <Text>
                    <Link href="/ipassets">
                        IP ASSETS
                    </Link>
                </Text>
                <Text>
                    <Link href="/licenses">
                        LICENSES
                    </Link>
                </Text>
                <Spacer />
                <ConnectKitButton.Custom>
                    {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                        return (
                            <Button onClick={show} mb="4">
                                {isConnected ? transformAddress(address) : "Custom Connect"}
                            </Button>
                        );
                    }}
                </ConnectKitButton.Custom>
            </VStack>
        </Box>
    )
}