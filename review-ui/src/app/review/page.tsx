// pages/index.tsx
import QuestionAnswerTile from "@/components/QuestionAnswerTile";
import { Box, Flex, Grid } from "@chakra-ui/react";

const tiles = [
  // Replace with your actual data (question and answer pairs)
  { question: "What is the capital of France?", answer: "Paris" },
  { question: 'Who wrote "Romeo and Juliet"?', answer: "William Shakespeare" },
  // Add more tiles as needed
];

const Home: React.FC = () => {
  return (
    <Flex direction="column" align="stretch" justify="start" pt={10} h="100vh" w="100vw" bg="gray.100">
      <Box p={4}>
        <Grid templateColumns="repeat(auto-fill, minmax(305px, 1fr))" gap={4}>
          {tiles.map((tile, index) => (
            <QuestionAnswerTile key={index} question={tile.question} answer={tile.answer} />
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Home;
