// ** MUI Imports
import { Theme } from "@mui/material/styles";

const MuiStyles = (theme: Theme) => {
  return {
    "::-webkit-scrollbar": {
      cursor: "pointer",
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
    },

    "::-webkit-scrollbar-track": {
      cursor: "pointer",
      backgroundColor: "transparent",
    },

    "::-webkit-scrollbar-thumb": {
      cursor: "pointer",
      borderRadius: theme.spacing(40),
      backgroundColor: theme.palette.primary.main,
    },

    "@keyframes spin": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },

    "@keyframes ping": {
      "75%, 100%": { transform: "scale(2)", opacity: 0 },
    },

    "@keyframes pulse": {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0.5 },
    },

    "@keyframes bounce": {
      "0%, 100%": {
        transform: "translateY(-25%)",
        animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
      },
      "50%": {
        transform: "translateY(0)",
        animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
      },
    },
  };
};

export default MuiStyles;
