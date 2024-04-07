"use client";

// ** External Imports
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import withGuest from "@/hocs/with-guest";
import GuestLayout from "@/layouts/guest";
import { createSchema } from "@/utils/validations";
import LinkBack from "@/components/auth/link-back";
import { getMessage, getValidations, withValidation } from "@/utils/helpers";

// ** MUI Imports
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

const validation = createSchema((yup) => ({
  email: yup.email(),
}));

const Page = () => {
  const router = useRouter();

  const methods = useForm<any>({
    defaultValues: { email: "" },
    resolver: validation,
  });

  const submit = methods.handleSubmit(async (values) => {
    try {
      const response = await api.auth.forgotPassword(values);

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
            variant="outlined"
            sx={{ marginBottom: 4 }}
            {...methods.register("email")}
            {...withValidation(methods, "email")}
          />

          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            sx={{ marginBottom: 4 }}
            loading={methods.formState.isSubmitting}
          >
            Send Reset Link
          </LoadingButton>

          <LinkBack href="/login" text="Come back to login" />
        </form>
      </FormProvider>
    </GuestLayout>
  );
};

export default withGuest(Page);
