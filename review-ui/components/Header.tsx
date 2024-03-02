"use client";

import * as React from "react";
import { Box, Button, Flex, IconButton, Text, Image } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import TruncatedString from "./TruncatedString";

export default function Header({ account }: { account: string }) {
  return (
    <Box bg="blue.700" w="100%" p={4} color="white">
      <Flex justify="space-between">
        <Flex justify="flex-start" align="center">
          <TruncatedString str={account} />
        </Flex>
        <Flex alignSelf="center">
          <Image src="/in-the-loop.png" boxSize="14" mr={4}></Image>
          <Text fontSize="3xl" fontWeight="bold" alignSelf="center">
            In The Loop
          </Text>
        </Flex>
        <Flex justify="flex-end" align="center">
          <IconButton
            colorScheme="black"
            aria-label="Menu"
            size="lg"
            icon={<HamburgerIcon />}
          />
        </Flex>
      </Flex>
    </Box>
  );
}