import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "react-toastify/dist/ReactToastify.css";
import Guest from "./Guest";
import User from "./User";

function Navbar() {
  const authorization = useSelector((store: RootState) => store.auth.authorization);

  return (
  <Box sx={{ flexGrow: 1 }}>
    <ToastContainer autoClose={2000}/>
    {authorization ? <User/> :  <Guest />}
  </Box>
  );
}

export default Navbar;