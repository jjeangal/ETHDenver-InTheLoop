"use client";

import * as React from "react";
import { Box, Button, Flex, IconButton, Text, Image } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header({ account }: { account: string }) {
  return (
    <Box bg="blue.700" p={4} color="white">
      <Flex justify="space-between">
        <Flex justify="flex-start" align="center">
          <Image src="/in-the-loop.png" boxSize="14" mr={4}></Image>
          <Text fontSize="3xl" fontWeight="bold" alignSelf="center">
            In The Loop
          </Text>
        </Flex>
        <Flex justify="flex-end" align="center">
          <ConnectButton />
        </Flex>
      </Flex>
    </Box>
  );
}
