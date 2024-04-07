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
import TextPassword from "@/components/form/text-password";
import { getStatus, getValidations, withValidation } from "@/utils/helpers";

// ** MUI Imports
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";

const validation = createSchema((yup) => ({
  email: yup.email(),
  password: yup.password(),
  remember: yup.boolean(),
}));

const Page = () => {
  const router = useRouter();

  const session = useSession();

  const methods = useForm<any>({
    defaultValues: { email: "", password: "", remember: false },
    resolver: validation,
  });

  const submit = methods.handleSubmit(async (values) => {
    try {
      await api.auth.login(values);

      session.mutate();

      router.push("/dashboard");
    } catch (error) {
      getValidations(methods, error as AxiosError);

      if (getStatus(error as AxiosError) === 302) {
        router.push("/two-factor");
      }
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
            sx={{ marginBottom: 1 }}
            {...methods.register("password")}
            {...withValidation(methods, "password")}
          />

          <Box
            sx={{
              display: "flex",
              marginBottom: 4,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              label="Remember me"
              control={<Switch {...methods.register("remember")} />}
            />

            <Link href="/forgot-password" passHref legacyBehavior>
              <MuiLink
                underline="none"
                sx={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                Forgot Password?
              </MuiLink>
            </Link>
          </Box>

          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            sx={{ marginBottom: 4 }}
            loading={methods.formState.isSubmitting}
          >
            Sign In
          </LoadingButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ marginRight: 2 }}>
              Don&rsquo;t have an account?
            </Typography>

            <Link href="/register" passHref legacyBehavior>
              <MuiLink
                underline="none"
                sx={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                Sign Up
              </MuiLink>
            </Link>
          </Box>
        </form>
      </FormProvider>
    </GuestLayout>
  );
};

export default withGuest(Page);
