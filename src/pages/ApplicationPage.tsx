import { lazy } from "react";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectApplicationCurrentStep } from "../features/application/applicaionSelector";
import {
  resetApplication,
  setCurrentApplicationStep,
  setErrorMessage,
  setLoading,
} from "../features/application/applicationSlice";
import { clearStorage } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { submitData } from "../services/application.service";

/* Lazy loading and code splitting */
const PersonalDetails = lazy(
  () => import("../components/form/personalDetails/PersonalDetails"),
);
const FamilyFinancialDetails = lazy(
  () =>
    import("../components/form/familyFinanceDetails/FamilyFinancialDetails"),
);
const SituationDetails = lazy(
  () => import("../components/form/situationDetails/SituationDetails"),
);

/*
 * ApplicationPage - Main page of application
 * This page has control for all form (Personal, FamilyFinance & Situation)
 */
const ApplicationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* All required state selector */
  const currentStep = useSelector(selectApplicationCurrentStep);
  /*
   * updateAplicationStep
   * Method to update step number to redux state for moving next and back
   */
  const updateAplicationStep = (step: number) => {
    dispatch(setCurrentApplicationStep(step));
  };

  /*
   * submitDetails
   * Method to send all form details to API
   * Handle succes and failure to move to success and error page respectively
   */
  const submitDetails = async () => {
    dispatch(setLoading(true));
    try {
      await submitData();
      dispatch(setLoading(false));
      dispatch(resetApplication());
      clearStorage();
      navigate("/success");
    } catch (err: any) {
      dispatch(setErrorMessage(err?.message));
      dispatch(setLoading(false));
    }
  };

  /* Render the form based on current step */
  const renderStepForm = () => {
    switch (currentStep) {
      case 0:
        return <PersonalDetails onNext={() => updateAplicationStep(1)} />;
      case 1:
        return (
          <FamilyFinancialDetails
            onNext={() => updateAplicationStep(2)}
            onBack={() => updateAplicationStep(0)}
          />
        );
      case 2:
        return (
          <SituationDetails
            onBack={() => updateAplicationStep(1)}
            onSubmitFinal={submitDetails}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          px: { xs: 1, sm: 2 },
          py: { xs: 1, sm: 1 },
        }}
      >
        <Box mt={{ xs: 1, sm: 1 }}>
          {renderStepForm()}
        </Box>
      </Container>
    </>
  );
};

export default ApplicationPage;
