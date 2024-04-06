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
            label="E-mail"
            variant="outlined"
            sx={{ marginBottom: 4 }}
            {...methods.register("email")}
            {...withValidation(methods, "email")}
          />

          <TextField
            fullWidth
            id="password"
            label="Senha"
            type="password"
            variant="outlined"
            sx={{ marginBottom: 4 }}
            {...methods.register("password")}
            {...withValidation(methods, "password")}
          />

          <TextField
            fullWidth
            type="password"
            variant="outlined"
            label="Confirmar Senha"
            sx={{ marginBottom: 4 }}
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
            Resetar Senha
          </LoadingButton>

          <LinkBack href="/login" text="Voltar para o Login" />
        </form>
      </FormProvider>
    </GuestLayout>
  );
};

export default withGuest(Page);
