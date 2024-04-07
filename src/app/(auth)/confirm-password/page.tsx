"use client";

// ** External Imports
import { toast } from "sonner";
import { AxiosError } from "axios";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import withAuth from "@/hocs/with-auth";
import GuestLayout from "@/layouts/guest";
import useConfirmed from "@/hooks/confirmed";
import { createSchema } from "@/utils/validations";
import LinkBack from "@/components/auth/link-back";
import TextPassword from "@/components/form/text-password";
import { getMessage, getValidations, withValidation } from "@/utils/helpers";

// ** MUI Imports
import LoadingButton from "@mui/lab/LoadingButton";

const validation = createSchema((yup) => ({
  password: yup.password(),
}));

const Page = () => {
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

      toast.success(getMessage(response));
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
          <TextPassword
            fullWidth
            id="password"
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

export default withAuth(Page, {
  verified: false,
});
