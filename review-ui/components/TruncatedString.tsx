import { Text } from "@chakra-ui/react";
import React from "react";

function TruncatedString({
  str,
  frontLength = 6,
  backLength = 4,
}: {
  str: string;
  frontLength?: number;
  backLength?: number;
}) {
  let truncatedStr = str;
  if (str.length > frontLength + backLength) {
    truncatedStr = `${str.substring(0, frontLength)}...${str.substring(
      str.length - backLength
    )}`;
  }

  return <Text fontSize="lg">{truncatedStr}</Text>;
}

export default TruncatedString;