// ** External Imports
import { AxiosError } from "axios";
import { ElementType } from "react";
import { useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import useAlert from "@/stores/alert";
import useSession from "@/hooks/session";
import { getMessage } from "@/utils/helpers";

// ** MUI Imports
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import AlertTitle from "@mui/material/AlertTitle";
import Link, { LinkProps } from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";

type LinkStyleProps = LinkProps & {
  component: ElementType;
};

const LinkStyle = styled(Link)<LinkStyleProps>({
  display: "flex",
  fontWeight: 400,
  cursor: "pointer",
  alignItems: "center",
});

const ResendEmail = () => {
  const alert = useAlert();

  const session = useSession();

  const methods = useForm<any>();

  const resendEmail = methods.handleSubmit(async () => {
    try {
      const response = await api.auth.emailVerification();

      alert.openDynamic(getMessage(response), "success");
    } catch (error) {
      alert.openDynamic(getMessage(error as AxiosError), "error");
    }
  });

  return (
    <>
      {!session.user?.email_verified_at ? (
        <Alert sx={{ mb: 6 }} variant="filled" severity="warning">
          <AlertTitle>
            Your email is not confirmed. Please check your inbox.
          </AlertTitle>

          <LinkStyle
            color="inherit"
            component="label"
            underline="hover"
            onClick={() => resendEmail()}
          >
            Resend Confirmation
            {methods.formState.isSubmitting && (
              <CircularProgress
                size={15}
                color="inherit"
                sx={{ marginLeft: 2 }}
              />
            )}
          </LinkStyle>
        </Alert>
      ) : null}
    </>
  );
};

export default ResendEmail;
