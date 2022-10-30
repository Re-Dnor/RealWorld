import LoginForm from "./LoginForm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Typography, CssBaseline, Container } from "@mui/material";

export default function Login() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
}
