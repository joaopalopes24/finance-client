// ** External imports
import Check from "mdi-material-ui/Check";
import Close from "mdi-material-ui/Close";

export enum BooleanEnum {
  TRUE = 1,
  FALSE = 0,
}

export const BooleanCases = [
  { value: BooleanEnum.TRUE, label: "Active", icon: Check, color: "success" },
  { value: BooleanEnum.FALSE, label: "Inactive", icon: Close, color: "error" },
];
