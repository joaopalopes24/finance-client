// ** External Imports
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ChevronRight from "mdi-material-ui/ChevronRight";

// ** Internal Imports
import api from "@/repositories/api";
import useTwoFactor from "@/stores/two-factor";

// ** MUI Imports
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import CardContent from "@mui/material/CardContent";
import Typography, { TypographyProps } from "@mui/material/Typography";

const RecoveryCode = styled(Typography)<TypographyProps>({
  fontWeight: 600,
  textTransform: "uppercase",
  // prettier-ignore
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
});

const RecoveryCodes = () => {
  const methods = useForm<any>();

  const twoFactor = useTwoFactor();

  const [show, setShow] = useState(false);

  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];

  const spin = methods.formState.isSubmitting;

  const see = twoFactor.hasRecoveryCodes() && !spin;

  const submit = methods.handleSubmit(async () => {
    await api.twoFactor.newRecoveryCodes().then(() => {
      setShow(true);

      twoFactor.showRecoveryCodes();
    });
  });

  useEffect(() => {
    show ? twoFactor.showRecoveryCodes() : twoFactor.hideRecoveryCodes();
  }, [show]);

  if (!twoFactor.confirmed) return null;

  return (
    <>
      <Card sx={{ position: "relative", marginTop: 4, minHeight: 64 }}>
        <Collapse in={show}>
          {see ? (
            <CardContent>
              {twoFactor.recoveryCodes.map((code, key) => (
                <RecoveryCode key={key} variant="body2" color="text.secondary">
                  {code}
                </RecoveryCode>
              ))}
            </CardContent>
          ) : (
            <CardContent>
              {skeleton.map((code, key) => (
                <Skeleton key={key} variant="text" width={180} height={20} />
              ))}
            </CardContent>
          )}
        </Collapse>

        <LoadingButton
          loading={spin}
          color="success"
          variant="outlined"
          onClick={() => submit()}
          sx={{ top: 14, right: 64, position: "absolute" }}
        >
          New Codes
        </LoadingButton>

        <IconButton
          // variant="outlined"
          onClick={() => setShow(!show)}
          sx={{
            top: 14,
            right: 14,
            position: "absolute",
            transition: "margin .15s ease",
            transform: show ? "rotate(90deg)" : "",
          }}
        >
          <ChevronRight />
        </IconButton>
      </Card>
    </>
  );
};

export default RecoveryCodes;
