import { Grid, Button, Typography, Toolbar, AppBar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Guest() {
  const navigation = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigation(`${e.currentTarget.name}`);
  };

  return (
    <AppBar position="static">
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid item xs={8}>  
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={"/"}
              >Conduit
            </Link>
          </Typography>
          <Button color="inherit" name="/" onClick={handleClick}>Home</Button>
          <Button color="inherit" name="signin" onClick={handleClick}>Sign in</Button>
          <Button color="inherit" name="signup" onClick={handleClick}>Sign up</Button>
        </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Guest;