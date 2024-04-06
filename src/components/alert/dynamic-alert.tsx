// ** External Imports
import { SyntheticEvent, forwardRef } from "react";
import { map, sum, take, size, isEmpty } from "lodash";

// ** Internal Imports
import useAlert from "@/stores/alert";

// ** MUI Imports
import { styled } from "@mui/material/styles";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import Grow, { GrowProps } from "@mui/material/Grow";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type SnackbarType = SnackbarProps & { size: number };

function GrowTransition(props: GrowProps) {
  return <Grow {...props} timeout={1000} />;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
});

const SnackbarStyled = styled(Snackbar)<SnackbarType>(({ size, theme }) => ({
  transition: "transform .5s ease",
  [theme.breakpoints.down("sm")]: {
    transform: `translateY(-${size}px) !important`,
  },
  [theme.breakpoints.up("sm")]: {
    transform: `translateX(-50%) translateY(-${size}px) !important`,
  },
}));

const DynamicAlert = () => {
  const alert = useAlert();

  const handleClose =
    (id: string) => (event?: SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }

      alert.closeDynamic(id);
    };

  const getSize = (index: number) => {
    var elements = document.querySelectorAll('[data-alert="true"]');

    if (isEmpty(elements)) return 0;

    const sizes = map(elements, (element) => {
      return element.clientHeight + 8;
    });

    if (size(sizes) >= alert.maxDynamicItems) sizes.shift();

    return sum(take(sizes, index));
  };

  return (
    <>
      {alert.dynamic.map((item, index) => (
        <SnackbarStyled
          key={item.id}
          data-alert={true}
          open={item.visible}
          size={getSize(index)}
          autoHideDuration={4000}
          onClose={handleClose(item.id)}
          TransitionComponent={GrowTransition}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            sx={{ width: "100%" }}
            severity={item.variant}
            onClose={handleClose(item.id)}
          >
            {item.message}
          </Alert>
        </SnackbarStyled>
      ))}
    </>
  );
};

export default DynamicAlert;
