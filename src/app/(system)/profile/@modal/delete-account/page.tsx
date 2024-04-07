"use client";

// ** External Imports
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import withAuth from "@/hocs/with-auth";
import useSession from "@/hooks/session";
import useConfirmed from "@/hooks/confirmed";
import { getMessage } from "@/utils/helpers";
import ConfirmPassword from "@/components/auth/confirm-password";

// ** MUI Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const Page = () => {
  const router = useRouter();

  const session = useSession();

  const confirmed = useConfirmed();

  const handleClose = () => {
    router.push("/profile", { scroll: false });
  };

  const methods = useForm<any>();

  const submit = methods.handleSubmit(async () => {
    const response = await api.profile.destroyAccount();

    handleClose();

    session.mutate();

    toast.success(getMessage(response));
  });

  return (
    <>
      <FormProvider {...methods}>
        <Dialog
          fullWidth
          maxWidth="xs"
          onClose={handleClose}
          open={confirmed.confirmed}
          PaperProps={{
            component: "form",
            onSubmit: submit,
          }}
        >
          <DialogTitle color="error.main">Delete Account</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Do you really want to delete your account? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button color="inherit" onClick={handleClose}>
              Cancel
            </Button>

            <LoadingButton
              type="submit"
              color="error"
              loading={methods.formState.isSubmitting}
            >
              Delete
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </FormProvider>

      <ConfirmPassword open={!confirmed.confirmed} handleClose={handleClose} />
    </>
  );
};

export default withAuth(Page, {
  verified: false,
});
