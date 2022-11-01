import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AuthState, LoginData, SignupData } from "../../../types";
import { BASE_URL, SLICES_NAMES } from "../../../utils/constants";

function setUserData(state, action) {
  state.login = action.payload.user.username;
  state.token = action.payload.user.token;
  state.email = action.payload.user.email;
  state.image = action.payload.user.username;
  state.authorization = true;
  localStorage.setItem("token", action.payload.user.token);
  localStorage.setItem("email", action.payload.user.email);
}

export const fetchLogin = createAsyncThunk("auth/fetchLogin", async (data: LoginData, { rejectWithValue }) => {
  const URL = `${BASE_URL}/users/login`;
  const body = {
    user: {
      email: data.email,
      password: data.password
    }
  };
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (response.ok) {
    return response.json();
  } else {
    return rejectWithValue(response.status);
  }
});

export const fetchSignup = createAsyncThunk("auth/fetchSignup", async (data: SignupData, { rejectWithValue }) => {
  const URL = `${BASE_URL}/users`;
  const body = {
    user: {
      username: data.username,
      email: data.email,
      password: data.password
    }
  };
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (response.ok) {
    return response.json();
  } else {
    return rejectWithValue(response.status);
  }
});

const initialState: AuthState = {
  login: "",
  email: "",
  token: "",
  image: "",
  authorization: false
};

export const authSlice = createSlice({
  name: SLICES_NAMES.AUTH,
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.authorization = false;
    },
    login: (state) => {
      state.authorization = true;
    },
    getData: (state, action) => {
      state.email = action.payload.email;
    },
    resetData: (state) => {
      state.email = "";
    }
  },
  extraReducers: (builder) => {
    // Fetch data for login
    builder.addCase(fetchLogin.pending, (state) => {
      state.authorization = false;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      setUserData(state, action);
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      toast.error("Incorrect email or password");
      state.authorization = false;
    });

    // Fetch data for registration
    builder.addCase(fetchSignup.pending, (state) => {
      state.authorization = false;
    });
    builder.addCase(fetchSignup.fulfilled, (state, action) => {
      setUserData(state, action);
    });
    builder.addCase(fetchSignup.rejected, (state) => {
      toast.error("Email or login has already been taken");
      state.authorization = false;
    });
  }
});

export const { logout, login, getData, resetData } = authSlice.actions;
export default authSlice.reducer;
