// ** MUI Imports
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const PaperLoading = styled(Paper)(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Loading = () => {
  return (
    <PaperLoading color="background">
      <CircularProgress />
    </PaperLoading>
  );
};

export default Loading;
