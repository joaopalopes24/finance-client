// ** External imports
import Reload from "mdi-material-ui/Reload";
import ClockOutline from "mdi-material-ui/ClockOutline";
import CloseCircleOutline from "mdi-material-ui/CloseCircleOutline";
import CheckCircleOutline from "mdi-material-ui/CheckCircleOutline";

export enum StatusEnum {
  PENDING = 1,
  PROCESSING = 2,
  CANCELED = 3,
  COMPLETED = 4,
}

export const StatusValues = [
  StatusEnum.PENDING,
  StatusEnum.PROCESSING,
  StatusEnum.CANCELED,
  StatusEnum.COMPLETED,
];

export const StatusCases = [
  {
    value: StatusEnum.PENDING,
    label: "Pending",
    icon: ClockOutline,
    color: "warning",
  },
  {
    value: StatusEnum.PROCESSING,
    label: "Processing",
    icon: Reload,
    color: "info",
  },
  {
    value: StatusEnum.CANCELED,
    label: "Canceled",
    icon: CloseCircleOutline,
    color: "error",
  },
  {
    value: StatusEnum.COMPLETED,
    label: "Completed",
    icon: CheckCircleOutline,
    color: "success",
  },
];
