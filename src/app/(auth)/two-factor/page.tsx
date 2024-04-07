"use client";

// ** External Imports
import { get } from "lodash";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { MuiOtpInput } from "mui-one-time-password-input";
import CursorDefaultClick from "mdi-material-ui/CursorDefaultClick";
import { Controller, FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import useSession from "@/hooks/session";
import withGuest from "@/hocs/with-guest";
import GuestLayout from "@/layouts/guest";
import { createSchema } from "@/utils/validations";
import LinkBack from "@/components/auth/link-back";
import { getValidations, withValidation } from "@/utils/helpers";

// ** MUI Imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import FormHelperText from "@mui/material/FormHelperText";

const validation = createSchema((yup) => ({
  recover: yup.boolean(),
  code: yup.string().when("recover", {
    is: false,
    then: (yup) => yup.required().length(6),
  }),
  recovery_code: yup.string().when("recover", {
    is: true,
    then: (yup) => yup.required().length(21),
  }),
}));

const Page = () => {
  const router = useRouter();

  const session = useSession();

  const methods = useForm<any>({
    defaultValues: { recover: false, code: "", recovery_code: "" },
    resolver: validation,
  });

  const recover = methods.watch("recover");

  const handleRecover = () => {
    methods.resetField("code");
    methods.resetField("recovery_code");

    methods.setValue("recover", !methods.watch("recover"));
  };

  const submit = methods.handleSubmit(async (values) => {
    try {
      await api.auth.twoFactor(values);

      session.mutate();

      router.push("/dashboard");
    } catch (error) {
      getValidations(methods, error as AxiosError);
    }
  });

  return (
    <GuestLayout>
      <FormProvider {...methods}>
        <form onSubmit={submit}>
          {recover && (
            <TextField
              fullWidth
              id="recover"
              variant="outlined"
              sx={{ marginBottom: 4 }}
              label="Código de Recuperação"
              {...methods.register("recovery_code")}
              {...withValidation(methods, "recovery_code")}
            />
          )}

          {!recover && (
            <Controller
              name="code"
              control={methods.control}
              render={({ field, fieldState }) => (
                <Box sx={{ marginBottom: 4 }}>
                  <MuiOtpInput
                    length={6}
                    {...field}
                    TextFieldsProps={{
                      placeholder: "-",
                      error: fieldState.invalid,
                    }}
                  />

                  {fieldState.invalid && (
                    <FormHelperText
                      error
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      {get(fieldState.error, "message")}
                    </FormHelperText>
                  )}
                </Box>
              )}
            />
          )}

          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            sx={{ marginBottom: 4 }}
            loading={methods.formState.isSubmitting}
          >
            Acessar
          </LoadingButton>

          <LinkBack
            variant="body1"
            color="secondary"
            // @ts-ignore
            icon={CursorDefaultClick}
            onClick={() => handleRecover()}
            sx={{ marginBottom: 4, cursor: "pointer" }}
            text={
              recover
                ? "Usar Código Dois Fatores"
                : "Usar Código de Recuperação"
            }
          />

          <LinkBack href="/login" text="Voltar para o Login" />
        </form>
      </FormProvider>
    </GuestLayout>
  );
};

export default withGuest(Page);
