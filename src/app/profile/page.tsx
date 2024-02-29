import { Flex } from "@chakra-ui/react";
import Licenses from "../components/Licenses";
import MySongs from "../components/MySongs";
import Derivatives from "../components/Derivatives";

export default function Profile() {
    return (
        <Flex flexDirection="column">
            <MySongs />
            <Licenses />
            <Derivatives />
        </Flex>
    );
}
