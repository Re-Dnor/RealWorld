import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (slug: string) => {
    const URL = `https://api.realworld.io/api/articles/${slug}/comments`;
    const response = await fetch(URL);
    return response.json();
  }
);

export interface AuthorComments {
  username: string,
  image: string,
  bio: null,
  following: boolean,
}

export interface Comments {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  body: string,
  author: AuthorComments
}

export interface commentsState {
  comments: Comments[];
  loading: boolean;
}

const initialState: commentsState = {
  comments: [],
  loading: false
};

export const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.loading = false;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.loading = false;
      toast.error("No comments");
    });
  }
});


export default comments.reducer;