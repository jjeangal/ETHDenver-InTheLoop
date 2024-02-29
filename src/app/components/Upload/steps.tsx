import { RegisterStepsProps } from "../../services/interfaces";
import { compareSvg, songInfoSvg, uploadSvg, validSvg } from "../Svgs";
import {
  Box,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react'

const steps = [
  { title: 'Compare', description: 'Choose song file', icon: compareSvg },
  { title: 'Upload', description: 'Upload song information', icon: uploadSvg },
  { title: 'Review', description: 'Review uploaded song', icon: songInfoSvg },
];

export const RegisterSteps: React.FC<RegisterStepsProps> = ({ state }) => {

  return (
    <Stepper size='md' index={state}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={validSvg}
              incomplete={step.icon}
              active={step.icon}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};