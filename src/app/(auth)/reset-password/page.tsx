"use client";

// ** External Imports
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import withGuest from "@/hocs/with-guest";
import GuestLayout from "@/layouts/guest";
import { createSchema } from "@/utils/validations";
import LinkBack from "@/components/auth/link-back";
import TextPassword from "@/components/form/text-password";
import { getValidations, withValidation } from "@/utils/helpers";

// ** MUI Imports
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

const validation = createSchema((yup) => ({
  email: yup.email(),
  password: yup.password(),
  password_confirmation: yup.confirmPassword("password"),
}));

const Page = () => {
  const router = useRouter();

  const methods = useForm<any>({
    defaultValues: {
      token: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    resolver: validation,
  });

  const submit = methods.handleSubmit(async (values) => {
    try {
      await api.auth.resetPassword(values);

      router.push("/login");
    } catch (error) {
      getValidations(methods, error as AxiosError);
    }
  });

  return (
    <GuestLayout>
      <FormProvider {...methods}>
        <form onSubmit={submit}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            sx={{ marginBottom: 4 }}
            {...methods.register("email")}
            {...withValidation(methods, "email")}
          />

          <TextPassword
            fullWidth
            id="password"
            label="Password"
            variant="outlined"
            sx={{ marginBottom: 4 }}
            {...methods.register("password")}
            {...withValidation(methods, "password")}
          />

          <TextPassword
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 4 }}
            label="Confirm Password"
            id="password_confirmation"
            {...methods.register("password_confirmation")}
            {...withValidation(methods, "password_confirmation")}
          />

          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            sx={{ marginBottom: 4 }}
            loading={methods.formState.isSubmitting}
          >
            Reset Password
          </LoadingButton>

          <LinkBack href="/login" text="Come back to login" />
        </form>
      </FormProvider>
    </GuestLayout>
  );
};

export default withGuest(Page);
