import { useSelector } from "react-redux";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import { Avatar, Typography, Box } from "@mui/material";
import { RootState } from "../../store/store";

export default function Profile() {
  const user = useSelector((store: RootState) => store.auth);
  
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <SentimentSatisfiedIcon sx={{ width: 36, height: 36 }} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Profile
      </Typography>
      <Typography component="h1" variant="h5">
        {user.email}
      </Typography>
    </Box>
  );
}
