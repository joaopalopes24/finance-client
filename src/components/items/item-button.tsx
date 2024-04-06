// ** External Imports
import { hexToRGBA } from "@/utils/helpers";
import { ElementType, ReactNode, forwardRef } from "react";

// ** MUI Imports
import { Theme, styled } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemButtonProps } from "@mui/material/ListItemButton";

type Props = ItemButtonProps & {
  active: boolean;
  children: ReactNode;
};

type ItemButtonProps = ListItemButtonProps & {
  component: ElementType;
};

const firstColor = (component: ElementType, theme: Theme) => {
  return component === "a"
    ? hexToRGBA(theme.palette.primary.main, 0.4)
    : hexToRGBA(theme.palette.secondary.main, 0.2);
};

const secondColor = (component: ElementType, theme: Theme) => {
  return component === "a"
    ? theme.palette.primary.main
    : hexToRGBA(theme.palette.secondary.main, 0.3);
};

const ItemButtonStyled = styled(ListItemButton)<ItemButtonProps>(
  ({ theme, component }) => ({
    width: "100%",
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    color: theme.palette.text.primary,
    padding: theme.spacing(2.25, 3.5),
    transition: "opacity .25s ease-in-out",
    "&.active, &.active:hover": {
      boxShadow: theme.shadows[3],
      backgroundImage: `linear-gradient(98deg, ${firstColor(component, theme)}, ${secondColor(component, theme)} 94%)`,
    },
  }),
);

const ItemButton = forwardRef((props: Props, ref: any) => {
  const { active, children, ...rest } = props;

  return (
    <ItemButtonStyled
      {...rest}
      className={active ? "active" : ""}
      sx={{ pl: 5.5, cursor: "pointer" }}
    >
      {children}
    </ItemButtonStyled>
  );
});

export default ItemButton;
