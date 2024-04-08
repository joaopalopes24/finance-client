"use client";

// ** External Imports
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useQueryClient } from "react-query";
import { useParams, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import withAuth from "@/hocs/with-auth";
import { getMessage } from "@/utils/helpers";

// ** MUI Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const Page = () => {
  const params = useParams();

  const router = useRouter();

  const queryClient = useQueryClient();

  const methods = useForm<any>();

  const handleClose = () => {
    router.push("/transactions", { scroll: false });
  };

  const submit = methods.handleSubmit(async () => {
    try {
      const response = await api.transaction.delete(params.id as string);

      handleClose();

      toast.success(getMessage(response));

      queryClient.invalidateQueries("/api/transactions");
    } catch (error) {
      toast.error(getMessage(error as AxiosError));
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
        <DialogTitle color="primary">Delete Transaction</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Do you really want to delete this transaction?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" loading={methods.formState.isSubmitting}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default withAuth(Page);
