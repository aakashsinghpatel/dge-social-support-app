import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectApplicationCurrentStep,
  selectApplicationErrorMessage,
  selectApplicationLading,
} from "../../features/application/applicaionSelector";
import ProgressBar from "../progressBar/ProgressBar";
import Loader from "../loader/Loader";
import { ErrorAlert } from "../errorAlert/ErrorAlert";

/*
 * MainLayout
 * Main layout under while all paget/component renders : Durinng routins
 */
const MainLayout = () => {
  /* All reuired state selector */
  const currentStep = useSelector(selectApplicationCurrentStep);
  const isLoading = useSelector(selectApplicationLading);
  const errorMessage = useSelector(selectApplicationErrorMessage);

  return (
    <Container
      sx={{
        px: { xs: 1, sm: 2 },
        py: { xs: 2 },
      }}
      maxWidth="md"
    >
      <ProgressBar activeStep={currentStep} />
      <Box>
        <Outlet />
      </Box>
      <Loader loading={isLoading} />
      <ErrorAlert errorMessage={errorMessage}></ErrorAlert>
    </Container>
  );
};

export default MainLayout;
