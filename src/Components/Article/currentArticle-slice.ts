import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { currentArticle } from "../../types";
import { BASE_URL, SLICES_NAMES } from "../../utils/constants";

export const fetchSlug = createAsyncThunk("currentArticle/fetchArticle", async (slug: string) => {
  const URL = `${BASE_URL}/articles/${slug}`;
  const response = await fetch(URL);
  return response.json();
});

const initialState: currentArticle = {
  title: null,
  body: null,
  description: null,
  username: null,
  image: null,
  favoritesCount: null
};

export const currentArticleSlice = createSlice({
  name: SLICES_NAMES.CURRENT_ARTICLE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSlug.fulfilled, (state, action) => {
      state.title = action.payload.article.title;
      state.body = action.payload.article.body;
      state.description = action.payload.article.description;
      state.username = action.payload.article.author.username;
      state.image = action.payload.article.author.image;
      state.favoritesCount = action.payload.article.favoritesCount;
    });
    builder.addCase(fetchSlug.rejected, () => {
      toast.error("Oops, something goes wrong. Please, try again.");
    });
  }
});

export default currentArticleSlice.reducer;
