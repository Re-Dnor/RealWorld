import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import { CssBaseline, Avatar, Typography, Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function Profile() {
  const user = useSelector((store: RootState) => store.auth);

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
        <SentimentSatisfiedIcon sx={{ width: 36, height: 36 }} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Profile
      </Typography>
      <Typography component="h1" variant="h5">
        { user.email }
      </Typography>
    </Box>
  </Container>
  );
}

export default Profile;