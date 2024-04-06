"use client";

// ** External Imports
import { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";
import LogoutVariant from "mdi-material-ui/LogoutVariant";

// ** Internal Imports
import api from "@/repositories/api";
import useAlert from "@/stores/alert";
import withAuth from "@/hocs/with-auth";
import useSession from "@/hooks/session";
import GuestLayout from "@/layouts/guest";
import { getMessage } from "@/utils/helpers";
import LinkBack from "@/components/auth/link-back";

// ** MUI Imports
import LoadingButton from "@mui/lab/LoadingButton";

const Page = () => {
  const alert = useAlert();

  const session = useSession();

  const methods = useForm<any>();

  const submit = methods.handleSubmit(async () => {
    try {
      const response = await api.auth.emailVerification();

      alert.openDynamic(getMessage(response), "success");
    } catch (error) {
      alert.openDynamic(getMessage(error as AxiosError), "error");
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

export default withAuth(Page);
