"use client";

// ** External Imports
import { toast } from "sonner";
import { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";
import LogoutVariant from "mdi-material-ui/LogoutVariant";

// ** Internal Imports
import api from "@/repositories/api";
import withAuth from "@/hocs/with-auth";
import useSession from "@/hooks/session";
import GuestLayout from "@/layouts/guest";
import { getMessage } from "@/utils/helpers";
import LinkBack from "@/components/auth/link-back";

// ** MUI Imports
import LoadingButton from "@mui/lab/LoadingButton";

const Page = () => {
  const session = useSession();

  const methods = useForm<any>();

  const submit = methods.handleSubmit(async () => {
    try {
      const response = await api.auth.emailVerification();

      toast.success(getMessage(response));
    } catch (error) {
      toast.error(getMessage(error as AxiosError));
    }
  });

  return (
    <GuestLayout>
      <FormProvider {...methods}>
        <form onSubmit={submit}>
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            sx={{ marginBottom: 4 }}
            loading={methods.formState.isSubmitting}
          >
            Reenviar Email de Verificação
          </LoadingButton>

          <LinkBack
            text="Sair"
            // @ts-ignore
            icon={LogoutVariant}
            sx={{ cursor: "pointer" }}
            onClick={() => session.logout()}
          />
        </form>
      </FormProvider>
    </GuestLayout>
  );
};

export default withAuth(Page, {
  verified: false,
});
