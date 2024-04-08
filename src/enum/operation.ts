// ** External imports
import ArrowUpThin from "mdi-material-ui/ArrowUpThin";
import ArrowDownThin from "mdi-material-ui/ArrowDownThin";

export enum OperationEnum {
  INCOME = 1,
  EXPENSE = 2,
}

export const OperationValues = [
  OperationEnum.INCOME,
  OperationEnum.EXPENSE,
];

export const OperationCases = [
  { value: OperationEnum.INCOME, label: "Income", icon: ArrowUpThin, color: "success" },
  { value: OperationEnum.EXPENSE, label: "Expense", icon: ArrowDownThin, color: "error" },
];
