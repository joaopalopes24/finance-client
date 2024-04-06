"use client";

// ** External Imports
import Link from "next/link";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import useSession from "@/hooks/session";
import withGuest from "@/hocs/with-guest";
import GuestLayout from "@/layouts/guest";
import { createSchema } from "@/utils/validations";
import { getValidations, withValidation } from "@/utils/helpers";

// ** MUI Imports
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

const validation = createSchema((yup) => ({
  name: yup.string().required(),
  email: yup.email(),
  password: yup.password(),
  password_confirmation: yup.confirmPassword("password"),
}));

const Page = () => {
  const router = useRouter();

  const session = useSession();

  const methods = useForm<any>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    resolver: validation,
  });

  const submit = methods.handleSubmit(async (values) => {
    try {
      await api.auth.register(values);

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
          <TextField
            fullWidth
            id="name"
            label="Full Name"
            variant="outlined"
            sx={{ marginBottom: 4 }}
            {...methods.register("name")}
            {...withValidation(methods, "name")}
          />

          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            sx={{ marginBottom: 4 }}
            {...methods.register("email")}
            {...withValidation(methods, "email")}
          />

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

          <TextField
            fullWidth
            type="password"
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
            Sign Up
          </LoadingButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ marginRight: 2 }}>
              Already have an account?
            </Typography>

            <Link href="/login" passHref legacyBehavior>
              <MuiLink
                underline="none"
                sx={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                Back to Sign In
              </MuiLink>
            </Link>
          </Box>
        </form>
      </FormProvider>
    </GuestLayout>
  );
};

export default withGuest(Page);
