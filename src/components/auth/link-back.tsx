// ** External Imports
import Link from "next/link";
import { ReactNode, forwardRef } from "react";
import ChevronLeft from "mdi-material-ui/ChevronLeft";

// ** MUI Imports
import MuiLink from "@mui/material/Link";
import { LinkProps } from "@mui/material/Link";
import Typography from "@mui/material/Typography";

type Props = LinkProps & {
  text: string;
  href?: string;
  icon?: ReactNode;
};

const LinkStyled = forwardRef(({ text, icon, ...props }: Props, ref: any) => {
  const { sx, ...rest } = props;

  // @ts-ignore
  const IconTag: ReactNode = icon || ChevronLeft;

  return (
    <MuiLink
      {...rest}
      underline="none"
      sx={{
        ...sx,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* @ts-ignore */}
      <IconTag sx={{ marginRight: 2 }} />

      <Typography
        sx={{
          marginTop: 0.5,
          fontWeight: 500,
          fontSize: "0.875rem",
        }}
      >
        {text}
      </Typography>
    </MuiLink>
  );
});

const LinkBack = ({ text, href, ...props }: Props) => {
  return (
    <>
      {href ? (
        <Link href={href} passHref legacyBehavior>
          <LinkStyled text={text} {...props} />
        </Link>
      ) : (
        <LinkStyled text={text} component="span" {...props} />
      )}
    </>
  );
};

export default LinkBack;
