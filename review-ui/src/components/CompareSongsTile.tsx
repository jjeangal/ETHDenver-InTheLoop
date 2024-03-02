// components/QuestionAnswerTile.tsx
"use client";

import { useState } from "react";
import {
  Box,
  Button,
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

interface CompileSongsTileProps {
  song1: number[];
  song2: number[];
}

const CompileSongsTile: React.FC<CompileSongsTileProps> = ({ song1, song2 }) => {

  
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
        <MidiPlayer sequence={song1} index={1} />
        <MidiPlayer sequence={song2} index={2}/>
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
            <Button colorScheme="green" flexGrow={1}>
              Accept
            </Button>
            <Button colorScheme="red" flexGrow={1}>Reject</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CompileSongsTile;
