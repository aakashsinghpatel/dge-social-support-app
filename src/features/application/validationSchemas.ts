import dayjs from "dayjs";
import { z as zod} from "zod";

/*
 * zod validation schema for personal details form fiels
 */
export const createPersonalDetailsSchema = (translate: (key: string) => string) =>
  zod.object({
    /*
     ** Name field validation
     * String, should be alphabetic and can contain space
     * minimum length 2 charater
     * max length character is 100
     */
    name: zod
      .string()
      .trim()
      .regex(/^[A-Za-z\s]+$/, translate("validationError.personalInfo.name.invalid"))
      .min(2, translate("validationError.personalInfo.name.min"))
      .max(100, translate("validationError.personalInfo.name.max")),

    /*
     ** nationalId field validation
     * String
     * UAE national id validation
     * 15-Alphanumeric, start with 784-> 11 numbers -> end with single number
     */
    nationalId: zod
      .string()
      .trim()
      .regex(
        /^[784][0-9]\d{4}[0-9]\d{7}[0-9]{1}$/,
        translate("validationError.personalInfo.nationalId.invalid"),
      ),

    /*
     ** dob field validation
     * It should be validate date
     * Date should not be of future
     * Age should be greater than or equal to 18
     */
    dob: zod
      .any()
      .refine((value) => value && dayjs(value).isValid(), {
        message: translate("validationError.personalInfo.dob.required"),
      })
      .refine((value) => !dayjs(value).isAfter(dayjs()), {
        message: translate("validationError.personalInfo.dob.notFuture"),
      })
      .refine(
        (value) => {
          const age = dayjs().diff(dayjs(value), "year");
          return age >= 18;
        },
        {
          message: translate("validationError.personalInfo.dob.validAge"),
        },
      ),
    /*
     ** Gender field validation
     * should be valid string value
     */
    gender: zod
      .string()
      .trim()
      .refine(
        (val) => {
          return !!val;
        },
        { message: translate("validationError.personalInfo.gender.invalid") },
      ),
    /* Address field validation
     * Any alphanumeric character expect special symbols
     * Min should be 1 character
     * Max of 255 charater
     */
    address: zod
      .string()
      .trim()
      .regex(
        /^[0-9A-Za-z\s]+$/,
        translate("validationError.personalInfo.address.invalid"),
      )
      .min(1, translate("validationError.personalInfo.address.min"))
      .max(255, translate("validationError.personalInfo.address.max")),
    /* city field validation
     * Any alphanumeric character expect special symbols
     * Min should be 1 character
     */
    city: zod
      .string()
      .trim()
      .regex(/^[A-Za-z\s]+$/, translate("validationError.personalInfo.city.invalid"))
      .min(1, translate("validationError.personalInfo.city.min")),
    /* state field validation
     * Any alphabet character expect special symbols
     * Min should be 1 character
     */
    state: zod
      .string()
      .trim()
      .regex(/^[A-Za-z\s]+$/, translate("validationError.personalInfo.state.invalid"))
      .min(1, translate("validationError.personalInfo.state.min")),
    /* country field validation
     * Any alphabet character expect special symbols
     * Min should be 1 character
     */
    country: zod
      .string()
      .trim()
      .regex(/^[A-Za-z\s]+$/, translate("validationError.personalInfo.country.invalid"))
      .min(1, translate("validationError.personalInfo.country.min")),
    /* phone field validation
     * Valid UAT number
     * Start with either of(+971|971|0)(50|52|54|55|56|58) and followed by 7 numbers.
     */
    phone: zod
      .string()
      .regex(
        /^(?:\+971|971|0)(50|52|54|55|56|58)\d{7}$/,
        translate("validationError.personalInfo.phone.invalid"),
      ),
    /* eamil field validation
     * Valid email address
     */
    email: zod
      .string()
      .trim()
      .email(translate("validationError.personalInfo.email.invalid")),
  });

/*
 * zod validation schema for family finace details form fields
 */
export const createFamilyFinanceDetailsSchema = (translate: (key: string) => string) =>
  zod.object({
    /* marital status field validation
     * should be non empty string value
     */
    maritalStatus: zod
      .string()
      .trim()
      .refine((val) => !!val, {
        message: translate("validationError.financialInfo.maritalStatus.required"),
      }),

    /* dependents field validation
     * should be valid number, with minimum 0
     */
    dependents: zod.preprocess(
      (val) => {
        if (val === "" || val === undefined) return undefined;
        return Number(val);
      },
      zod
        .number({ message: translate("validationError.financialInfo.dependents.min") })
        .min(0, { message: translate("validationError.financialInfo.dependents.min") }),
    ),
    /* employment status field validation
     * should be valid non-empty string
     */
    employmentStatus: zod
      .string()
      .trim()
      .refine((val) => !!val, {
        message: translate("validationError.financialInfo.employmentStatus.required"),
      }),
    /* Monthly income field validation
     *  should be valid number, with minimum 0
     */
    monthlyIncome: zod.preprocess(
      (val) => {
        if (val === "" || val === undefined) return undefined;
        return Number(val);
      },
      zod
        .number({
          message: translate("validationError.financialInfo.monthlyIncome.min"),
        })
        .min(0, {
          message: translate("validationError.financialInfo.monthlyIncome.min"),
        }),
    ),
    /* Housing status status field validation
     * should be valid non-empty string of min length 5
     */
    housingStatus: zod.string()
      .min(5, translate("validationError.financialInfo.housingStatus.required"),
    ),
  });

/*
 * zod validation schema for Situation details form fiels
 */
export const createSituationDetailsSchema = (translate: (key: string) => string) =>
  zod.object({
    /* Financial situation field validation
     * String with minimum 10 character
     */
    financialSituation: zod
      .string()
      .min(10, translate("validationError.situationInfo.financialSituation.invalid")),
    /* Employment circumstances field validation
     * String with minimum 10 character
     */
    employmentCircumstances: zod
      .string()
      .min(
        10,
        translate("validationError.situationInfo.employmentCircumstances.invalid"),
      ),
    /* Reason for applying field validation
     * String with minimum 10 character
     */
    reasonForApplying: zod
      .string()
      .min(10, translate("validationError.situationInfo.reasonForApplying.invalid")),
  });
