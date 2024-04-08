// ** External Imports
import { useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import useTwoFactor from "@/stores/two-factor";

// ** MUI Imports
import LoadingButton from "@mui/lab/LoadingButton";

const Enable = () => {
  const methods = useForm<any>();

  const twoFactor = useTwoFactor();

  const submit = methods.handleSubmit(async () => {
    await api.twoFactor.enable().then(() => {
      twoFactor.enable();
    });
  });

  if (twoFactor.confirmed || twoFactor.enabled) return null;

  return (
    <LoadingButton
      color="success"
      onClick={() => submit()}
      loading={methods.formState.isSubmitting}
    >
      Enable
    </LoadingButton>
  );
};

export default Enable;
