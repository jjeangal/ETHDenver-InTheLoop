// components/QuestionAnswerTile.tsx
"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import MidiPlayer from "./MidiPlayer";

// components/QuestionAnswerTile.tsx

interface CompareSongsTileProps {
  song1: number[];
  song2: number[];
  castVote: any;
  subId: number;
}

const CompareSongsTile: React.FC<CompareSongsTileProps> = ({
  song1,
  song2,
  castVote,
  subId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box
        p={4}
        bg="white"
        rounded="md"
        shadow="md"
        w="300px"
        h="300px"
        cursor="pointer"
        onClick={handleTileClick}
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Text fontWeight="bold" mb={2}>
          Song Review Panel #13
        </Text>
        <Flex
          flexDirection="column"
          justifyContent="stretch"
          alignItems="center"
          gap={2}
        >
          <MidiPlayer sequence={song1} index={1} />
          <MidiPlayer sequence={song2} index={2} />
        </Flex>
      </Box>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Do these two songs constitute different IP?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex width="100%">
              <Center flexGrow={1} alignContent="stretch">
                <MidiPlayer sequence={song1} index={1} />
              </Center>
              <Center flexGrow={1}>
                <MidiPlayer sequence={song2} index={2} />
              </Center>
            </Flex>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button
              colorScheme="green"
              onClick={() => {handleCloseModal()  
                castVote(subId, 1)}}
              flexGrow={1}
            >
              Yes
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {handleCloseModal()
                castVote(subId, 0)}}
              flexGrow={1}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CompareSongsTile;
