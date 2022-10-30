import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { DataLogin } from "../Components/Login/LoginForm";
import { DataSignup } from "../Components/Signup/SignupForm";
import { toast } from "react-toastify";

function setUserData(state, action) {
  state.login = action.payload.user.username;
  state.token = action.payload.user.token;
  state.email = action.payload.user.email;
  state.image = action.payload.user.username;
  state.authorization = true;
}

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (data: DataLogin, { rejectWithValue }) => {
      const URL = "https://api.realworld.io/api/users/login";
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
  }
);

export const fetchSignup = createAsyncThunk(
  "auth/fetchSignup",
  async (data: DataSignup, { rejectWithValue }) => {
    const URL = "https://api.realworld.io/api/users";
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
  }
);

export interface authState {
  login: string;
  email: string;
  token: string;
  image: string;
  authorization: boolean;
}

const initialState: authState = {
  login: "",
  email: "",
  token: "",
  image: "",
  authorization: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.authorization = false;
    }
  },
  extraReducers: (builder) => {
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

export const { logout } = authSlice.actions;

export default authSlice.reducer;