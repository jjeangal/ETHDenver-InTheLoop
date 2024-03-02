// components/QuestionAnswerTile.tsx
"use client";

import { useState } from "react";
import {
  Box,
  Button,
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
  castVote: any,
  subId: number,
}

const CompareSongsTile: React.FC<CompareSongsTileProps> = ({ song1, song2, castVote, subId }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box p={4} bg="white" rounded="md" shadow="md" w="300px" h="300px" cursor="pointer" onClick={handleTileClick}>
        <Text fontWeight="bold" mb={2}>
          Song Review:
        </Text>
        <Flex flexDirection="column" justifyContent="stretch" alignItems="center" gap={2}>
        <MidiPlayer sequence={song1} index={1} />
        <MidiPlayer sequence={song2} index={2}/>
        </Flex>
       </Box> 
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Question and Answer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
        <MidiPlayer sequence={song1} index={1} />
        <MidiPlayer sequence={song2} index={2}/>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button colorScheme="green" onClick={() => castVote(subId, 1)} flexGrow={1}>
              Accept
            </Button>
            <Button colorScheme="red" onClick={() => castVote(subId, 0)} flexGrow={1}>Reject</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CompareSongsTile;
