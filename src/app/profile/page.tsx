import { Flex } from "@chakra-ui/react";
import ProfileLicenses from "../components/ProfileLicenses";
import MySongs from "../components/MySongs";
import Derivatives from "../components/Derivatives";

export default function Profile() {
    return (
        <Flex flexDirection="column">
            <MySongs />
            <ProfileLicenses />
            <Derivatives />
        </Flex>
    );
}
