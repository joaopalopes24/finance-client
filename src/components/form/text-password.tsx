// ** External Imports
import { forwardRef, useState } from "react";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// ** MUI Imports
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const TextPassword = forwardRef((props: TextFieldProps, ref: any) => {
  const [show, setShow] = useState(false);

  const handleClickShowPassword = () => {
    setShow(!show);
  };

  return (
    <TextField
      ref={ref}
      {...props}
      type={show ? "text" : "password"}
      InputProps={
        {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleClickShowPassword}>
                {show ? <EyeOutline /> : <EyeOffOutline />}
              </IconButton>
            </InputAdornment>
          ),
        } as any
      }
    />
  );
});

export default TextPassword;
