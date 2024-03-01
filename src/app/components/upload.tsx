'use client'

import { Box, Text, Button, Progress, Input, VStack, HStack, Flex } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { songTrad } from "../basicPitch/songenc";
import { SongForm } from "./Upload/songForm";
import { UploadSteps } from "./Upload/steps";
import { UploadStepsProps } from "../services/interfaces";
import { RegisterIp } from "./Upload/registerIp";
import { Copyright } from "../services/interfaces";

export default function Upload() {
    const [regState, setRegState] = useState<UploadStepsProps>({ state: 2 }); // ["upload", "info", "compare", "deployed"]
    const [songId, setSongId] = useState<bigint>(BigInt(0));
    const [song, setSong] = useState<ArrayBuffer | undefined>();
    const [songName, setSongName] = useState<string>();
    const [metadata, setMetadata] = useState("");
    const [txHash, setTxHash] = useState("");
    const [progress, setProgress] = useState(0);
    const [compared, setCompared] = useState<{ cp: boolean; text: string }>({ cp: false, text: "" });
    const [copyrights, setCopyrigths] = useState<Copyright[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(file);
        if (file) {
            handleFile(file);
        }
    };

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = async () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            console.log(arrayBuffer);
            setSong(arrayBuffer);
            setSongName(file.name);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleStart = async () => {
        if (song) {
            const { follow, id, rate } = await songTrad(song, setProgress, setCompared);
            if (follow) {
                setRegState({ state: 1 });
                setCopyrigths([{ songId: id, shares: BigInt(Math.round(rate * 100)) }]);
            }
        } else {
            alert("No song selected");
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.style.border = "3px dashed #999";
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.style.border = "3px dashed #999";
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.style.border = "";
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.style.border = "";
        const files = event.dataTransfer.files;
        if (files.length) {
            handleFile(files[0]);
        }
    };

    const removeFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
            setSong(undefined);
            setSongName("");
        } else {
            console.log("No file input ref");
        }
    };

    return (
        <Flex direction="column" justifyContent="center" alignItems="center" minHeight="100vh">
            <Box display="flex" alignItems="center" justifyContent="center" position="fixed" top={0} left={0} right={0} mt="3%">
                <UploadSteps state={regState.state} />
            </Box>
            {regState.state === 0 && (
                <VStack spacing={5}>
                    <Text textAlign="center" mb={8} fontSize="4xl" fontWeight="bold">
                        Check for Copyright
                    </Text>
                    <Box
                        className="dropzone"
                        mb={4}
                        borderColor="black"
                        borderWidth={2}
                        p={4}
                        borderRadius="md"
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <Text fontWeight="bold" mb={2}>Drop file here, or click below!</Text>
                        <Input ref={fileInputRef} display="none" type="file" accept="audio/*" onChange={handleFileChange} />
                        <Button colorScheme="blue" onClick={() => fileInputRef.current?.click()}>
                            Upload
                        </Button>
                        <Text mt={2}>Only audio files accepted.</Text>
                        {song && (
                            <HStack>
                                <Text>{songName?.substring(0, 30)}...</Text>
                                <Button ml={2} mt={2} mr={2} borderColor="black" borderRadius="full" w={6} h={6} onClick={removeFile}>
                                    X
                                </Button>
                            </HStack>
                        )}
                    </Box>
                    <Box textAlign="center">
                        <Button colorScheme="blue" onClick={handleStart}>
                            Start
                        </Button>
                        {0 < progress && progress < 1 && (
                            <Box>
                                <Progress colorScheme="blue" value={progress * 100} />
                                <Text>{(progress * 100).toFixed(3)}%</Text>
                            </Box>
                        )}
                        {compared.cp && (
                            <Box>
                                <Text>{compared.text}</Text>
                            </Box>
                        )}
                    </Box>
                </VStack>
            )}
            {regState.state === 1 ?
                <SongForm
                    setState={setRegState}
                    setTxHash={setTxHash}
                    setMetadata={setMetadata}
                    setSongId={setSongId}
                    metadata={metadata}
                    copyrights={copyrights}
                /> : null}
            {regState.state === 2 ?
                <RegisterIp
                    id={songId}
                    copyrights={copyrights}
                    txHash={txHash}
                    metadata={metadata}
                /> : null}
        </Flex>
    );
};