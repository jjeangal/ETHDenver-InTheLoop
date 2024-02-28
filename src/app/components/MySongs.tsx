'use client';

import { useEffect, useState } from "react";
import { Flex, Box, Button } from "@chakra-ui/react";
import { IPA } from "../services/interfaces";
import RegisterIPA from "./RegisterIPA";

export default function MySongs() {
    const [isOpenIPA, setIsOpenIPA] = useState(false);
    const [isOpenNotIPA, setIsOpenNotIPA] = useState(false);
    const [IPAs, setIPAs] = useState<IPA[]>([]);
    const [notIPAs, setNotIPAs] = useState<IPA[]>([]);

    const [policyId, setPolicyId] = useState<BigInteger | undefined>(undefined);

    useEffect(() => {
        setNotIPAs([
            {
                id: BigInt(0),
                owner: "0x1234",
            }
        ]);
        setIPAs([
            {
                id: BigInt(1),
                owner: "0x1234",
            }
        ]);
    }, []);

    return (
        <Flex flexDirection="column" alignItems="center">
            <Box width="50%" marginBottom="8" marginTop="8">
                <Button
                    width="full"
                    paddingX="4"
                    paddingY="2"
                    textAlign="left"
                    backgroundColor="gray.200"
                    borderRadius="md"
                    onClick={() => setIsOpenNotIPA(!isOpenNotIPA)}
                    color="#293655"
                >
                    Unregistered IP Assets
                </Button>
                {isOpenNotIPA && (
                    notIPAs.map((notIPA) => (
                        <Box key={notIPA.id} padding="4" backgroundColor="gray.100" marginTop="2" borderRadius="md">
                            <Box fontWeight="bold">Song ID: {notIPA.id.toString()}</Box>
                            <Box>Owner: {notIPA.owner}</Box>
                            <RegisterIPA tokenId={BigInt(0)} policyId={BigInt(0)} />
                        </Box>
                    ))
                )}
            </Box>
            <Box width="50%" marginBottom="8" marginTop="8">
                <Button
                    width="full"
                    paddingX="4"
                    paddingY="2"
                    textAlign="left"
                    backgroundColor="gray.200"
                    borderRadius="md"
                    onClick={() => setIsOpenIPA(!isOpenIPA)}
                    color="#293655"
                >
                    Registered IP Assets
                </Button>
                {isOpenIPA && (
                    IPAs.map((ipa) => (
                        <Box key={ipa.id} padding="4" backgroundColor="gray.100" marginTop="2" borderRadius="md">
                            <Box fontWeight="bold">Song ID: {ipa.id.toString()}</Box>
                            <Box>Owner: {ipa.owner}</Box>
                        </Box>
                    ))
                )}
            </Box>
        </Flex>
    );
};