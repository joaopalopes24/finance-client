// ** External Imports
import { useState } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import useAlert from "@/stores/alert";
import useSession from "@/hooks/session";
import { getMessage } from "@/utils/helpers";
import useTwoFactor from "@/stores/two-factor";

// ** MUI Imports
import LoadingButton from "@mui/lab/LoadingButton";

const Destroy = () => {
  const alert = useAlert();

  const session = useSession();

  const methods = useForm<any>();

  const twoFactor = useTwoFactor();

  const [click, setClick] = useState(false);

  const submit = methods.handleSubmit(async () => {
    try {
      const response = await api.twoFactor.destroyTwoFactor();

      session.mutate();

      twoFactor.destroy();

      alert.openDynamic(getMessage(response), "success");
    } catch (error) {
      alert.openDynamic(getMessage(error as AxiosError), "error");
    }
  });

  if (!twoFactor.confirmed) return null;

  return (
    <LoadingButton
      color="error"
      loading={methods.formState.isSubmitting}
      onClick={() => (click ? submit() : setClick(true))}
    >
      {click ? "Confirm" : "Disable"}
    </LoadingButton>
  );
};

export default Destroy;
