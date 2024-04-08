// ** External Imports
import { toast } from "sonner";
import { useState } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import useSession from "@/hooks/session";
import { getMessage } from "@/utils/helpers";
import useTwoFactor from "@/stores/two-factor";

// ** MUI Imports
import LoadingButton from "@mui/lab/LoadingButton";

const Destroy = () => {
  const session = useSession();

  const methods = useForm<any>();

  const twoFactor = useTwoFactor();

  const [click, setClick] = useState(false);

  const submit = methods.handleSubmit(async () => {
    try {
      const response = await api.twoFactor.destroy();

      session.mutate();

      twoFactor.destroy();

      toast.success(getMessage(response));
    } catch (error) {
      toast.error(getMessage(error as AxiosError));
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
