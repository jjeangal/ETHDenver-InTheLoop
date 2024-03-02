'use client';

import { Flex, Heading } from "@chakra-ui/react";

export default function HomePage() {
    return (
        <Flex flexDirection="column" marginLeft="-10rem" justifyContent="center" alignItems="center" height="100vh" width="88vw">
            <Heading mb="10vh">Join us in The Loop</Heading>
            <Heading mb="10vh" size="md" ml="10rem">Start by uploading your song.</Heading>
            <Heading mb="10vh" size="sm" ml="20rem">Register it as an IP asset.</Heading>
            <Heading size="sm" ml="30rem">And decide how the community can make use of it.</Heading>
        </Flex>
    );
}