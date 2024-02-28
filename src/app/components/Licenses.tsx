'use client';

import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { SongNft } from "../services/interfaces";
import RegisterIPA from "./RegisterIPA";

export default function Licenses() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [unlicensedSongs, setUnlicensedSongs] = useState<SongNft[]>([]);
    const [licensedSongs, setLicensedSongs] = useState<SongNft[]>([]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" height="100vh">
            <Box width="50%" marginBottom="8" marginTop="8">
                <Button
                    width="full"
                    paddingX="4"
                    paddingY="2"
                    textAlign="left"
                    backgroundColor="gray.200"
                    borderRadius="md"
                    onClick={() => setIsOpen1(!isOpen1)}
                    color="#293655"
                >
                    Unlicensed Songs
                </Button>
                <RegisterIPA />
            </Box>
            <Box width="50%">
                <Button
                    width="full"
                    paddingX="4"
                    paddingY="2"
                    textAlign="left"
                    backgroundColor="gray.200"
                    borderRadius="md"
                    onClick={() => setIsOpen2(!isOpen2)}
                    color="#293655"
                >
                    Licensed Songs
                </Button>
            </Box>
        </Box>
    );
};