// ** External Imports
import ArrowUp from "mdi-material-ui/ArrowUp";

// ** MUI Imports
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import { styled } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const ScrollToTopStyled = styled("div")(({ theme }) => ({
  zIndex: 11,
  position: "fixed",
  right: theme.spacing(6),
  bottom: theme.spacing(10),
}));

const ScrollToTop = () => {
  const trigger = useScrollTrigger({
    threshold: 400,
    disableHysteresis: true,
  });

  const handleClick = () => {
    const anchor = document.querySelector("body");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Zoom in={trigger}>
      <ScrollToTopStyled
        role="presentation"
        className="mui-fixed"
        onClick={handleClick}
      >
        <Fab color="primary" size="small" aria-label="Scroll Back to Top">
          <ArrowUp />
        </Fab>
      </ScrollToTopStyled>
    </Zoom>
  );
};

export default ScrollToTop;
