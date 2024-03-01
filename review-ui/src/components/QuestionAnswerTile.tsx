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

// components/QuestionAnswerTile.tsx

interface QuestionAnswerTileProps {
  question: string;
  answer: string;
}

const QuestionAnswerTile: React.FC<QuestionAnswerTileProps> = ({ question, answer }) => {
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
          Question:
        </Text>
        <Text noOfLines={2} overflow="hidden" textOverflow="ellipsis">
          {question}
        </Text>

        <Text fontWeight="bold" mt={4} mb={2}>
          Answer:
        </Text>
        <Text noOfLines={2} overflow="hidden" textOverflow="ellipsis">{answer}</Text>
      </Box>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Question and Answer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold">Question:</Text>
            <Text>{question}</Text>

            <Text fontWeight="bold" mt={4}>
              Answer:
            </Text>
            <Text>{answer}</Text>
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

export default QuestionAnswerTile;
