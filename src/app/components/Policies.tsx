import { Box, Grid, Flex, Spinner, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { Policy } from "../services/interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

type PolicyProps = {
    policies: Policy[];
    setPolicyId: Dispatch<SetStateAction<bigint | undefined>>;
};

const Policies: React.FC<PolicyProps> = ({ policies, setPolicyId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

    const handleOpenModal = (policy: Policy) => {
        setSelectedPolicy(policy);
        onOpen();
    };

    if (policies.length === 0) {
        return <Spinner />;
    }

    return (
        <Box>
            <RadioGroup onChange={(value) => setPolicyId(BigInt(value))} defaultValue={policies[0].id.toString()}>
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    {Array.isArray(policies) && policies.map((policy) => (
                        <Flex key={policy.id} align="center" p={2}>
                            <Radio value={policy.id.toString()} size="lg" mr={2} />
                            <Box flex="1" fontSize="lg" mr={2}>
                                Policy {policy.id}
                            </Box>
                            <IconButton aria-label="More info" icon={<ViewIcon />} onClick={() => handleOpenModal(policy)} size="xs" />
                        </Flex>
                    ))}
                </Grid>
            </RadioGroup>

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