import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../store/store";
import Guest from "./Guest";
import User from "./User";

export default function Header() {
  const authorization = useSelector((store: RootState) => store.auth.authorization);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ToastContainer autoClose={2000} />
      {authorization ? <User /> : <Guest />}
    </Box>
  );
}
