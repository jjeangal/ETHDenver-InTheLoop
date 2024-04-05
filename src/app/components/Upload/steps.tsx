import { UploadStepsProps } from "../../services/interfaces";
import { compareSvg, songInfoSvg, uploadSvg, validSvg } from "../../../utils/Svgs";
import {
  Box,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper
} from '@chakra-ui/react'

const steps = [
  { title: 'Compare', description: 'Your music', icon: compareSvg },
  { title: 'Upload', description: 'Song information', icon: uploadSvg },
  { title: 'Register', description: 'Song as IP asset', icon: songInfoSvg },
];

export const UploadSteps: React.FC<UploadStepsProps> = ({ state }) => {

  return (
    <Stepper size='lg' index={state}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator mr="2%">
            <StepStatus
              complete={validSvg}
              incomplete={step.icon}
              active={step.icon}
            />
          </StepIndicator>

          <Box mr="2%" flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};