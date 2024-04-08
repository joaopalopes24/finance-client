// ** External Imports
import Link from "next/link";
import { ElementType } from "react";
import Plus from "mdi-material-ui/Plus";
import PencilOutline from "mdi-material-ui/PencilOutline";
import DeleteOutline from "mdi-material-ui/DeleteOutline";

// ** Internal Imports
import { BooleanCases } from "@/enum/boolean";

// ** MUI Imports
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

type CostCenter = {
  id: number;
  name: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};

type ComponentProps = {
  costCenter: CostCenter;
};

type BooleanCase = {
  value: boolean;
  label: string;
  icon: ElementType;
  color: "success" | "error";
};

export const CreateAction = () => {
  return (
    <Link passHref legacyBehavior scroll={false} href="/cost-centers/create">
      <Button variant="contained" startIcon={<Plus />}>
        New Cost Center
      </Button>
    </Link>
  );
};

export const StatusAction = ({ costCenter }: ComponentProps) => {
  const status = BooleanCases.find(
    (item) => Boolean(item.value) === costCenter.status,
  ) as BooleanCase | undefined;

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

export const ButtonAction = ({ costCenter }: ComponentProps) => {
  const { id } = costCenter;

  const links = [
    {
      color: "info",
      title: "Edit",
      icon: PencilOutline,
      href: `/cost-centers/${id}/edit`,
    },
    {
      color: "error",
      title: "Delete",
      icon: DeleteOutline,
      href: `/cost-centers/${id}/delete`,
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
