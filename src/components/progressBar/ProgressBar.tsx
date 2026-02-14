import { Stepper, Step, StepLabel, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const steps = ["personalinfo", "financialnfio", "situation"];

interface Props {
  activeStep: number;
}

/*  
* ProgressBar
* Stepper component to show step of application.
* Complete & non completed
*/
const ProgressBar = ({ activeStep }: Props) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Stepper
        sx={{mt:4}}
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{t(label)}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProgressBar;
