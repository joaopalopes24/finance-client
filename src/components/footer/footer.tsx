// ** MUI Imports
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          padding: theme.spacing(4, 6),
        }}
      >
        <Typography sx={{ mr: 2 }}>
          {`© ${new Date().getFullYear()}, Made by `}

          <Link
            target="_blank"
            underline="none"
            href="https://github.com/joaopalopes24"
          >
            João Pedro Lopes
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
