// ** External Imports
import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface CustomProps {
  name: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
}

const TextMoney = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        prefix="$ "
        decimalScale={2}
        getInputRef={ref}
        thousandSeparator
        valueIsNumericString
        fixedDecimalScale={true}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
      />
    );
  },
);

export default TextMoney;
