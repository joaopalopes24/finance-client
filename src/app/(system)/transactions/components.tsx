// ** External Imports
import Link from "next/link";
import { ElementType } from "react";
import Plus from "mdi-material-ui/Plus";
import PencilOutline from "mdi-material-ui/PencilOutline";
import DeleteOutline from "mdi-material-ui/DeleteOutline";

// ** Internal Imports
import { StatusCases } from "@/enum/status";
import { formatMoney } from "@/utils/helpers";
import { OperationCases } from "@/enum/operation";

// ** MUI Imports
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

type Transaction = {
  id: number;
  description: string;
  amount: number;
  date: string;
  operation: number;
  status: number;
  created_at: string;
  updated_at: string;
};

type ComponentProps = {
  transaction: Transaction;
};

type OperationCase = {
  value: number;
  label: string;
  icon: ElementType;
  color: "success" | "error";
};

type StatusCase = {
  value: number;
  label: string;
  icon: ElementType;
  color: "warning" | "info" | "success" | "error";
};

export const CreateAction = () => {
  return (
    <Link passHref legacyBehavior scroll={false} href="/transactions/create">
      <Button variant="contained" startIcon={<Plus />}>
        New Transaction
      </Button>
    </Link>
  );
};

export const AmountAction = ({ transaction }: ComponentProps) => {
  const amount = formatMoney(transaction.amount);

  return <Chip size="small" label={amount} variant="outlined" />;
};

export const OperationAction = ({ transaction }: ComponentProps) => {
  const status = OperationCases.find(
    (item) => item.value === transaction.operation,
  ) as OperationCase | undefined;

  if (!status) return null;

  const IconTag: ElementType = status.icon;

  return (
    <Chip
      size="small"
      icon={<IconTag />}
      color={status.color}
      label={status.label}
    />
  );
};

export const StatusAction = ({ transaction }: ComponentProps) => {
  const status = StatusCases.find(
    (item) => item.value === transaction.status,
  ) as StatusCase | undefined;

  if (!status) return null;

  const IconTag: ElementType = status.icon;

  return (
    <Chip
      size="small"
      icon={<IconTag />}
      color={status.color}
      label={status.label}
    />
  );
};

export const ButtonAction = ({ transaction }: ComponentProps) => {
  const { id } = transaction;

  const links = [
    {
      color: "info",
      title: "Edit",
      icon: PencilOutline,
      href: `/transactions/${id}/edit`,
    },
    {
      color: "error",
      title: "Delete",
      icon: DeleteOutline,
      href: `/transactions/${id}/delete`,
    },
  ];

  return links.map((link) => {
    const IconTag: ElementType = link.icon;

    const color = link.color as "info" | "error";

    return (
      <Tooltip key={link.title} title={link.title}>
        <Link passHref legacyBehavior scroll={false} href={link.href}>
          <IconButton size="small" color={color} aria-label={link.title}>
            <IconTag />
          </IconButton>
        </Link>
      </Tooltip>
    );
  });
};
