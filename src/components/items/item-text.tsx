// ** External Imports
import ChevronRight from "mdi-material-ui/ChevronRight";

// ** MUI Imports
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  active?: boolean;
}

const ItemTextComponent = styled(Box)<BoxProps>({
  width: "100%",
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "opacity .25s ease-in-out",
});

const ItemText = ({ title, active }: Props) => {
  return (
    <ItemTextComponent>
      <Typography noWrap>{title}</Typography>

      {active !== undefined && (
        <ChevronRight
          sx={{
            transition: "margin .15s ease",
            transform: active ? "rotate(90deg)" : "",
          }}
        />
      )}
    </ItemTextComponent>
  );
};

export default ItemText;
