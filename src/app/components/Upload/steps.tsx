import { Box, Text, OrderedList, ListItem } from "@chakra-ui/react";
import { RegisterStepsProps } from "../../services/interfaces";
import { compareSvg, songInfoSvg, uploadSvg, validSvg } from "../Svgs";

export const RegisterSteps: React.FC<RegisterStepsProps> = ({ state }) => {
  return (
    <OrderedList position="relative" color="gray.500" borderColor="gray.200" borderStyle="solid" borderWidth="1px">
      <ListItem mb="10" ml="6">
        {state > 0 ? validSvg : compareSvg}
        <Text as="h3" fontWeight="medium" lineHeight="tight">Compare</Text>
        <Text fontSize="sm">Choose song file</Text>
      </ListItem>
      <ListItem mb="10" ml="6">
        {state > 1 ? validSvg : uploadSvg}
        <Text as="h3" fontWeight="medium" lineHeight="tight">Upload</Text>
        <Text fontSize="sm">Upload song information</Text>
      </ListItem>
      <ListItem mb="10" ml="6">
        {state > 2 ? validSvg : songInfoSvg}
        <Text as="h3" fontWeight="medium" lineHeight="tight">Review</Text>
        <Text fontSize="sm">Review uploaded song</Text>
      </ListItem>
    </OrderedList>
  );
};