"use client";

// ** External Imports
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import withAuth from "@/hocs/with-auth";
import { createSchema } from "@/utils/validations";
import TextPassword from "@/components/form/text-password";
import { getMessage, getValidations, withValidation } from "@/utils/helpers";

// ** MUI Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const validation = createSchema((yup) => ({
  current_password: yup.password(),
  password: yup.password(),
  password_confirmation: yup.confirmPassword("password"),
}));

const Page = () => {
  const router = useRouter();

  const handleClose = () => {
    router.push("/profile", { scroll: false });
  };

  const methods = useForm<any>({
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    resolver: validation,
  });

  const submit = methods.handleSubmit(async (values) => {
    try {
      const response = await api.profile.updatePassword(values);

      handleClose();

      methods.reset();

      toast.success(getMessage(response));
    } catch (error) {
      getValidations(methods, error as AxiosError);
    }
  });

  return (
    <FormProvider {...methods}>
      <Dialog
        fullWidth
        open={true}
        maxWidth="xs"
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: submit,
        }}
      >
        <DialogTitle color="primary">Change Password</DialogTitle>

        <DialogContent>
          <DialogContentText>
            To change your password, please provide your current password and
            then your new password.
          </DialogContentText>

          <TextPassword
            fullWidth
            variant="outlined"
            id="currentPassword"
            sx={{ marginTop: 4 }}
            label="Current Password"
            {...methods.register("current_password")}
            {...withValidation(methods, "current_password")}
          />

          <TextPassword
            fullWidth
            id="password"
            label="Password"
            variant="outlined"
            sx={{ marginTop: 4 }}
            {...methods.register("password")}
            {...withValidation(methods, "password")}
          />

          <TextPassword
            fullWidth
            variant="outlined"
            sx={{ marginTop: 4 }}
            label="Confirm Password"
            id="password_confirmation"
            {...methods.register("password_confirmation")}
            {...withValidation(methods, "password_confirmation")}
          />
        </DialogContent>

        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" loading={methods.formState.isSubmitting}>
            Change
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default withAuth(Page, {
  verified: false,
});
