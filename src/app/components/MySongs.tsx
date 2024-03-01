'use client'

import { useEffect, useState } from "react";
import { Flex, Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { IPA } from "../services/interfaces";
import RegisterIPA from "./RegisterIPButton";

export default function MySongs() {
    const [IPAs, setIPAs] = useState<IPA[]>([]);
    const [notIPAs, setNotIPAs] = useState<IPA[]>([]);

    const [tokenId, setTokenId] = useState<BigInt | undefined>(BigInt(0));
    const [policyId, setPolicyId] = useState<BigInt | undefined>(BigInt(0));

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
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Unregistered IP Assets
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {notIPAs.map((notIPA) => (
                                <Box key={notIPA.id} padding="4" backgroundColor="gray.100" marginTop="2" borderRadius="md">
                                    <Box fontWeight="bold">Song ID: {notIPA.id.toString()}</Box>
                                    <Box>Owner: {notIPA.owner}</Box>
                                    <RegisterIPA tokenId={tokenId} policyId={policyId} />
                                </Box>
                            ))}
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Registered IP Assets
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {IPAs.map((ipa) => (
                                <Box key={ipa.id} padding="4" backgroundColor="gray.100" marginTop="2" borderRadius="md">
                                    <Box fontWeight="bold">Song ID: {ipa.id.toString()}</Box>
                                    <Box>Owner: {ipa.owner}</Box>
                                </Box>
                            ))}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
        </Flex>
    );
};