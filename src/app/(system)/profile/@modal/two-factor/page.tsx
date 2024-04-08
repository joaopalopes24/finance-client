"use client";

// ** External Imports
import { get } from "lodash";
import { toast } from "sonner";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { MuiOtpInput } from "mui-one-time-password-input";

// ** Internal Imports
import Enable from "./enable";
import Destroy from "./destroy";
import api from "@/repositories/api";
import withAuth from "@/hocs/with-auth";
import useSession from "@/hooks/session";
import useConfirmed from "@/hooks/confirmed";
import useTwoFactor from "@/stores/two-factor";
import { createSchema } from "@/utils/validations";
import { getMessage, getValidations } from "@/utils/helpers";
import ConfirmPassword from "@/components/auth/confirm-password";

// ** MUI Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormHelperText from "@mui/material/FormHelperText";
import DialogContentText from "@mui/material/DialogContentText";
import RecoveryCodes from "./recovery-codes";

const BoxEnable = styled(Box)<BoxProps>({
  marginTop: 4,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

const QrCode = styled("div")(({ theme }) => ({
  padding: 8,
  borderRadius: 8,
  marginBottom: 4,
  backgroundColor: theme.palette.common.white,
}));

const validation = createSchema((yup) => ({
  code: yup.string().required().length(6),
}));

const QrCodeBox = ({ qrCode }: { qrCode: string | null }) => {
  return (
    <>
      {qrCode ? (
        <QrCode dangerouslySetInnerHTML={{ __html: qrCode || "" }} />
      ) : (
        <Skeleton
          width={208}
          height={215}
          variant="rectangular"
          sx={{ marginBottom: 1, borderRadius: 2 }}
        />
      )}
    </>
  );
};

const SecretKeyBox = ({ secretKey }: { secretKey: string | null }) => {
  return (
    <>
      {secretKey ? (
        <Typography sx={{ fontWeight: 600 }}>
          Setup Key:&nbsp;
          <span
            dangerouslySetInnerHTML={{
              __html: secretKey || "",
            }}
          ></span>
        </Typography>
      ) : (
        <Skeleton
          width={250}
          height={24}
          variant="text"
          sx={{ fontSize: "1rem" }}
        />
      )}
    </>
  );
};

const Page = () => {
  const router = useRouter();

  const session = useSession();

  const confirmed = useConfirmed();

  const twoFactor = useTwoFactor();

  const handleClose = () => {
    router.push("/profile", { scroll: false });

    setTimeout(() => {
      twoFactor.cancel();
    }, 500);
  };

  useEffect(() => {
    twoFactor.setConfirmed(Boolean(session.user?.has_two_factor));
  }, []);

  /**
   * Confirm
   */
  const methods = useForm<any>({
    defaultValues: { code: "" },
    resolver: validation,
  });

  const submit = methods.handleSubmit(async (values) => {
    try {
      const response = await api.twoFactor.confirm(values);

      twoFactor.confirm();

      toast.success(getMessage(response));
    } catch (error) {
      getValidations(methods, error as AxiosError);
    }
  });

  return (
    <>
      <Dialog
        fullWidth
        scroll="body"
        maxWidth="sm"
        onClose={handleClose}
        open={confirmed.confirmed}
      >
        {twoFactor.confirmed && (
          <DialogTitle color="success.main">
            Two Factor Authentication Enabled
          </DialogTitle>
        )}

        {!twoFactor.confirmed && twoFactor.enabled && (
          <DialogTitle color="warning.main">
            Finalize Two Factor Authentication
          </DialogTitle>
        )}

        {!twoFactor.confirmed && !twoFactor.enabled && (
          <DialogTitle color="error">
            Two Factor Authentication Disabled
          </DialogTitle>
        )}

        <DialogContent>
          <DialogContentText>
            When two-factor authentication is enabled, you will be prompted for
            a random, secure token during authentication. You can retrieve this
            token in the Google Authenticator app on your phone.
          </DialogContentText>

          {twoFactor.enabled && !twoFactor.confirmed && (
            <DialogContentText sx={{ fontWeight: 600, marginTop: 4 }}>
              To finish two-factor authentication enabled, scan the following QR
              code using your phone&rsquo;s authenticator app or enter the setup
              key and provide the generated OTP code.
            </DialogContentText>
          )}

          {twoFactor.confirmed && (
            <DialogContentText sx={{ fontWeight: 600, marginTop: 4 }}>
              Store these recovery codes in a secure password manager. They can
              be used to regain access to your account if your two-factor
              authentication device is lost.
            </DialogContentText>
          )}

          <RecoveryCodes />

          {twoFactor.enabled && !twoFactor.confirmed && (
            <BoxEnable>
              <QrCodeBox qrCode={twoFactor.qrCode} />

              <SecretKeyBox secretKey={twoFactor.secretKey} />

              <Controller
                name="code"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Box sx={{ marginTop: 4, maxWidth: "24rem" }}>
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
            </BoxEnable>
          )}
        </DialogContent>

        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>

          <Enable />

          <Destroy />

          {twoFactor.enabled && !twoFactor.confirmed && (
            <LoadingButton
              color="success"
              onClick={() => submit()}
              loading={methods.formState.isSubmitting}
            >
              Confirm
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>

      <ConfirmPassword open={!confirmed.confirmed} handleClose={handleClose} />
    </>
  );
};

export default withAuth(Page, {
  verified: false,
});
