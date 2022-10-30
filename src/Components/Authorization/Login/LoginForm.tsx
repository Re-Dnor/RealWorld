import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchLogin } from "../auth-slice";
import { LoginData } from "../../../types";

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorization = useSelector((store: RootState) => store.auth.authorization);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: yup.object({
      email: yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: yup.string().required("Password is required")
    }),
    onSubmit: async (values) => {
      try {
        const data: LoginData = {
          email: values.email,
          password: values.password
        };
        dispatch(fetchLogin(data));
      } catch (error) {
        toast.error("Errrrors");
      }
    }
  });

  useEffect(() => {
    if (authorization) navigate("/");
  }, [ authorization ]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        type="email"
        autoFocus
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
}

export default LoginForm;
