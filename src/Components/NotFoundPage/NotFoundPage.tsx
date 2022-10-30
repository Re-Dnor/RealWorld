import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container, CssBaseline } from "@mui/material";

function NotFoundPage() {
  const navigate = useNavigate();

  const hadleClick = () => {
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "primary"
      }}
    >
      <Typography variant="h1" style={{ color: "black" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: "black" }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={hadleClick}>Back Home</Button>
    </Box>
  </Container>
  );
}

export default NotFoundPage;