// ** External Imports
import { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import useAlert from "@/stores/alert";
import useConfirmed from "@/hooks/confirmed";
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

type Props = {
  open: boolean;
  handleClose: () => void;
};

const validation = createSchema((yup) => ({
  password: yup.password(),
}));

const ConfirmPassword = ({ open, handleClose }: Props) => {
  const alert = useAlert();

  const confirmed = useConfirmed();

  const methods = useForm<any>({
    defaultValues: { password: "" },
    resolver: validation,
  });

  const submit = methods.handleSubmit(async (values) => {
    try {
      const response = await api.auth.confirmPassword(values);

      methods.reset();

      confirmed.mutate();

      alert.openDynamic(getMessage(response), "success");
    } catch (error) {
      getValidations(methods, error as AxiosError);
    }
  });

  return (
    <FormProvider {...methods}>
      <Dialog
        open={open}
        maxWidth="sm"
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: submit,
        }}
      >
        <DialogTitle color="primary">Confirm Password</DialogTitle>

        <DialogContent>
          <DialogContentText>
            For security reasons, please confirm your password.
          </DialogContentText>

          <TextField
            fullWidth
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            sx={{ marginTop: 4 }}
            {...methods.register("password")}
            {...withValidation(methods, "password")}
          />
        </DialogContent>

        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" loading={methods.formState.isSubmitting}>
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default ConfirmPassword;
