import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Container, Box, Typography, Avatar, CssBaseline } from "@mui/material";
import SignupForm from "./SignupForm";

function Signup() {
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
          Sign up
        </Typography>
        <SignupForm />
      </Box>
    </Container>
  );
}

export default Signup;
