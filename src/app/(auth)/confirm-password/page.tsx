"use client";

// ** External Imports
import { AxiosError } from "axios";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import useAlert from "@/stores/alert";
import withAuth from "@/hocs/with-auth";
import GuestLayout from "@/layouts/guest";
import useConfirmed from "@/hooks/confirmed";
import { createSchema } from "@/utils/validations";
import LinkBack from "@/components/auth/link-back";
import { getMessage, getValidations, withValidation } from "@/utils/helpers";

// ** MUI Imports
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

const validation = createSchema((yup) => ({
  password: yup.password(),
}));

const Page = () => {
  const alert = useAlert();

  const router = useRouter();

  const confirmed = useConfirmed();

  const methods = useForm<any>({
    defaultValues: { password: "" },
    resolver: validation,
  });

  const submit = methods.handleSubmit(async (values) => {
    try {
      const response = await api.auth.confirmPassword(values);

      confirmed.mutate();

      router.back();

      alert.openDynamic(getMessage(response), "success");
    } catch (error) {
      getValidations(methods, error as AxiosError);
    }
  });

  const backToDashboard = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    router.push("/dashboard");
  };

  return (
    <GuestLayout>
      <FormProvider {...methods}>
        <form onSubmit={submit}>
          <TextField
            fullWidth
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            sx={{ marginBottom: 4 }}
            {...methods.register("password")}
            {...withValidation(methods, "password")}
          />

          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            sx={{ marginBottom: 4 }}
            loading={methods.formState.isSubmitting}
          >
            Confirm Password
          </LoadingButton>

          <LinkBack
            href="#"
            text="Come back to dashboard"
            onClick={(e: MouseEvent<HTMLElement>) => backToDashboard(e)}
          />
        </form>
      </FormProvider>
    </GuestLayout>
  );
};

export default withAuth(Page);
