import { useEffect } from "react";
import { Box, Button, Grid, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchSignup } from "../auth-slice";
import { SignupData } from "../../../types";

function SignupForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorization = useSelector((store: RootState) => store.auth.authorization);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    validationSchema: yup.object({
      username: yup.string().trim().required("Username is not valid"),
      email: yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: yup.string().required("Password is required")
    }),
    onSubmit: async (values) => {
      try {
        const data: SignupData = {
          username: values.username,
          email: values.email,
          password: values.password
        };
        dispatch(fetchSignup(data));
      } catch (error) {
        toast.error("Errrrors");
      }
    }
  });

  useEffect(() => {
    if (authorization) navigate("/");
  }, [ authorization ]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive spam"
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
}

export default SignupForm;
