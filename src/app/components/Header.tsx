'use client';

import Link from 'next/link'
import { Flex, Box, Text, Button, Spacer } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";

export default function Header() {

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
        <Flex flexDirection="row" width="100vw" p="5">
            <Text mr="4" size="xxl">
                <Link href="/">
                    InTheLoop
                </Link>
            </Text>
            <Text mr="4">
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
        </Flex >
    )
}   