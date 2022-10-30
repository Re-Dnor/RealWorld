import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Progress() {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}

export default Progress;
