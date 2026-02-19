import {
  Grid,
  TextField,
  Button,
  Box,
  MenuItem,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFamilyFinanceDetailsSchema } from "../../../features/application/validationSchemas";
import { useDispatch, useSelector } from "react-redux";
import { saveFamilyFinanceDetails } from "../../../features/application/applicationSlice";
import { useTranslation } from "react-i18next";
import { selectFamilyFinanceDetails } from "../../../features/application/applicaionSelector";
import { useEffect } from "react";
import { saveToStorage } from "../../../utils/localStorage";
import type { FamilyFinanceDetailsType } from "../../../features/application/types";

type FamilyFinancialDetailsProps = {
  onNext: () => void;
  onBack: () => void;
};

const FamilyFinancialDetails = ({
  onNext,
  onBack,
}: FamilyFinancialDetailsProps) => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const financialData = useSelector(selectFamilyFinanceDetails);

  /*
   * Created form with react-hook form and enbled custom validation with zod lib at form/control level
   */
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createFamilyFinanceDetailsSchema(translate)),
    defaultValues: financialData || {},
  });

  /*
   * Help to update form with data save locally
   */
  useEffect(() => {
    reset(financialData);
  }, [financialData, reset]);

  /*
   * onSubmit
   * Method to save finaceDetails on click of next button to store and local storage
   */
  const onSubmit = (data: FamilyFinanceDetailsType) => {
    dispatch(saveFamilyFinanceDetails(data));
    saveToStorage("familyFinanceDetails", data);
    onNext();
  };

  /*
   * handleOnKeyDown: <event>
   * Dis-allow non number input to number field: Income etc.
   */
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "-" ||
      e.key === "e" ||
      e.key === "+" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault();
    }
  };

  /* renderFamilyFinancialDetailsForm
  * Return Form UI
  */
  const renderFamilyFinancialDetailsForm = () => {
    return(<form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          {/* Marital Status */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="maritalStatus"
              control={control}
              defaultValue={financialData?.maritalStatus || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label={translate("maritalStatus")}
                  fullWidth
                  error={!!errors.maritalStatus}
                  helperText={errors.maritalStatus?.message as string}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="single">{translate("single")}</MenuItem>
                  <MenuItem value="married">{translate("married")}</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Dependents */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              type="number"
              label={translate("dependents")}
              fullWidth
              onKeyDown={handleOnKeyDown}
              {...register("dependents", { valueAsNumber: true })}
              error={!!errors.dependents}
              helperText={errors.dependents?.message as string}
            />
          </Grid>

          {/* Employment Status */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="employmentStatus"
              control={control}
              defaultValue={financialData?.employmentStatus || ""}
              render={({ field }) => (
                <TextField
                  {...field} // provides value & onChange
                  select
                  label={translate("employmentStatus")}
                  fullWidth
                  error={!!errors.employmentStatus}
                  helperText={errors.employmentStatus?.message as string}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="employed">{translate("employed")}</MenuItem>
                  <MenuItem value="unemployed">{translate("unemployed")}</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Monthly Income */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              type="number"
              label={translate("monthlyIncome")}
              fullWidth
              onKeyDown={handleOnKeyDown}
              {...register("monthlyIncome", { valueAsNumber: true })}
              error={!!errors.monthlyIncome}
              helperText={errors.monthlyIncome?.message as string}
            />
          </Grid>

          {/* Housing Status */}
          <Grid size={12}>
            <TextField
              label={translate("housingStatus")}
              fullWidth
              {...register("housingStatus")}
              error={!!errors.housingStatus}
              helperText={errors.housingStatus?.message as string}
            />
          </Grid>
        </Grid>

        {/* Next and Back button */}
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={onBack}
            fullWidth={isMobile}
            sx={{ mr: 2 }}
            aria-label="back"
          >
            {translate("back")}
          </Button>

          <Button
            type="submit"
            variant="contained"
            fullWidth={isMobile}
            aria-label="Next Step"
          >
            {translate("next")}
          </Button>
        </Box>
      </form>)
  }

  return (
    <Box
      component="main"
      aria-labelledby="family-financial-details-heading"
      aria-hidden="false"
    >
      <Typography
        id="family-financial-details-heading"
        variant="h6"
        component="h4"
        gutterBottom
        sx={{
          py: { xs: 1 },
        }}
      >
        {translate("financialnfio")}
      </Typography>
      {/* Family and financial details form */}
      {renderFamilyFinancialDetailsForm()}
    </Box>
  );
};

export default FamilyFinancialDetails;
