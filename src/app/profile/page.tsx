import { Flex } from "@chakra-ui/react";
import Licenses from "../components/Licenses";
import MySongs from "../components/MySongs";

export default function Profile() {
    return (
        <Flex flexDirection="column">
            <MySongs />
            <Licenses />
        </Flex>
    );
}
