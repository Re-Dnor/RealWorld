import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { commentsState } from "../../types";
import { BASE_URL, SLICES_NAMES } from "../../utils/constants";

export const fetchComments = createAsyncThunk("comments/fetchComments", async (slug: string) => {
  const URL = `${BASE_URL}/articles/${slug}/comments`;
  const response = await fetch(URL);
  return response.json();
});

const initialState: commentsState = {
  comments: [],
  loading: false
};

export const commentsSlice = createSlice({
  name: SLICES_NAMES.COMMENTS,
  initialState,
  reducers: {},
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

export default commentsSlice.reducer;
