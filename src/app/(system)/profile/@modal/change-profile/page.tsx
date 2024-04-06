"use client";

// ** External Imports
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import useAlert from "@/stores/alert";
import withAuth from "@/hocs/with-auth";
import useSession from "@/hooks/session";
import { createSchema } from "@/utils/validations";
import { getMessage, getValidations, withValidation } from "@/utils/helpers";

// ** MUI Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const validation = createSchema((yup) => ({
  name: yup.string().required().max(255),
  email: yup.email(),
}));

const Page = () => {
  const alert = useAlert();

  const router = useRouter();

  const session = useSession();

  const handleClose = () => {
    router.push("/profile", { scroll: false });
  };

  const methods = useForm<any>({
    defaultValues: {
      name: session.user?.name,
      email: session.user?.email,
    },
    resolver: validation,
  });

  const submit = methods.handleSubmit(async (values) => {
    try {
      const response = await api.profile.updateProfile(values);

      handleClose();

      session.mutate();

      alert.openDynamic(getMessage(response), "success");
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
        <DialogTitle color="primary">Update Profile</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Update your profile information.
          </DialogContentText>

          <TextField
            fullWidth
            id="name"
            label="Full Name"
            variant="outlined"
            sx={{ marginTop: 4 }}
            {...methods.register("name")}
            {...withValidation(methods, "name")}
          />

          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            sx={{ marginTop: 4 }}
            {...methods.register("email")}
            {...withValidation(methods, "email")}
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

export default withAuth(Page);
