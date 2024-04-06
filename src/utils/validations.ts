// ** External Imports
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Yup = typeof yup;

type GetSchema = (validate: Validate) => any;

interface Validate extends Yup {
  email(): any;
  password(): any;
  twoFactorCode(): any;
  twoFactorRecoveryCode(): any;
  confirmPassword(field: string): any;
}

yup.setLocale({
  mixed: {
    required: "This field field is required.",
  },
  string: {
    email: "This field field must be a valid email address.",
    length: "This field field must be ${length} characters.",
    min: "This field field must be at least ${min} characters.",
    max: "This field field must not be greater than ${max} characters.",
  },
});

const createEmailRule = () => {
  return yup.string().required().email().max(255);
};

const createPasswordRule = () => {
  return yup.string().required().min(8).max(255);
};

const createTwoFactorCodeRule = () => {
  return yup.string().required().length(6);
};

const createTwoFactorRecoveryCodeRule = () => {
  return yup.string().required().length(21);
};

const createConfirmPasswordRule = (field: string) => {
  // prettier-ignore
  return yup.string().required().min(8).max(255).oneOf([yup.ref(field)], "This field field confirmation does not match.");
};

export function createSchema(getSchema: GetSchema) {
  const schema = getSchema({
    ...yup,
    email: createEmailRule,
    password: createPasswordRule,
    twoFactorCode: createTwoFactorCodeRule,
    confirmPassword: createConfirmPasswordRule,
    twoFactorRecoveryCode: createTwoFactorRecoveryCodeRule,
  });

  return yupResolver(yup.object().shape(schema));
}
