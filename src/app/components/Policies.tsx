import { Box, Grid, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Checkbox } from "@chakra-ui/react";
import { Policy } from "../services/interfaces";
import { useState } from "react";

type PolicyProps = {
    policies: Policy[];
};

const Policies: React.FC<PolicyProps> = ({ policies }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

    const handleOpenModal = (policy: Policy) => {
        setSelectedPolicy(policy);
        onOpen();
    };

    return (
        <Box>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {Array.isArray(policies) && policies.map((policy) => (
                    <Box key={policy.id}>
                        <Checkbox value={policy.id}>{policy.id}</Checkbox>
                        <Button onClick={() => handleOpenModal(policy)}>More Info</Button>
                    </Box>
                ))}
            </Grid>

            {selectedPolicy && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Policy {selectedPolicy.id}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p>Minting Fee: {selectedPolicy.mintingFee}</p>
                            <p>Commercial Use: {selectedPolicy.pil.commercialUse ? "Yes" : "No"}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
};

export default Policies;