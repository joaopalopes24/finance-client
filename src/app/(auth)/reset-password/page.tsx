"use client";

// ** External Imports
import { toast } from "sonner";
import { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

// ** Internal Imports
import api from "@/repositories/api";
import withGuest from "@/hocs/with-guest";
import GuestLayout from "@/layouts/guest";
import { createSchema } from "@/utils/validations";
import LinkBack from "@/components/auth/link-back";
import TextPassword from "@/components/form/text-password";
import { getMessage, getValidations, withValidation } from "@/utils/helpers";

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

  const params = useSearchParams();

  const methods = useForm<any>({
    defaultValues: {
      token: params.get("token") || "",
      email: params.get("email") || "",
      password: "",
      password_confirmation: "",
    },
    resolver: validation,
  });

  const submit = methods.handleSubmit(async (values) => {
    try {
      const response = await api.auth.resetPassword(values);

      router.push("/login");

      toast.success(getMessage(response));
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
            disabled={true}
            variant="outlined"
            sx={{ marginBottom: 4 }}
            {...methods.register("email")}
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
