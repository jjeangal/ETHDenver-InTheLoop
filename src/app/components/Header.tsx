'use client';

import Link from 'next/link'
import { Text, Button, Spacer, VStack, useColorModeValue } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import { useState } from 'react';

export default function Header() {
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
        <VStack as="nav" position="fixed" left={0} top={0} bottom={0} width="10%" m="5" spacing={4} borderRight="1px" borderColor={borderColor}>
            <Text size="xxl">
                <Link href="/">
                    InTheLoop
                </Link>
            </Text>
            <Text>
                <Link href="/profile">
                    profile
                </Link>
            </Text>
            <Text>
                <Link href="/uploadsong">
                    upload
                </Link>
            </Text>
            <Spacer />
            <ConnectKitButton.Custom>
                {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                    return (
                        <Button onClick={show}>
                            {isConnected ? transformAddress(address) : "Custom Connect"}
                        </Button>
                    );
                }}
            </ConnectKitButton.Custom>
        </VStack>
    )
}