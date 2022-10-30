import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Authorization/auth-slice";
import { Grid, Button, Typography, Toolbar, AppBar } from "@mui/material";

function User() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigation(`${e.currentTarget.name}`);
  };

  const handleExit = () => {
    dispatch(logout());
    navigation("/");
  };

  return (
    <AppBar position="static">
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid item xs={8}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link style={{ color: "white", textDecoration: "none" }} to={"/"}>
                Conduit
              </Link>
            </Typography>
            <Button color="inherit" name="profile" onClick={handleClick}>
              Profile
            </Button>
            <Button color="inherit" onClick={handleExit}>
              Exit
            </Button>
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default User;
