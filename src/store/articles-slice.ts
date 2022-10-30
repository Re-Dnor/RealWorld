import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (count: number) => {
    const URL = `https://api.realworld.io/api/articles?limit=5&offset=${count}`;
    const response = await fetch(URL);
    return response.json();
  }
);

export interface User {
  bio: string
  following: boolean
  image: string
  username: string
}

export interface Article {
  author: User
  body: string
  createdAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  tagList: string[]
  title: string
  updatedAt: string
}

export interface ArticlesState {
  articlesList: Article[];
  loading: boolean
}

const initialState: ArticlesState = {
  articlesList: [],
  loading: false
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articlesList = action.payload.articles;
      state.loading = false;
    });
    builder.addCase(fetchArticles.rejected, (state) => {
      state.loading = false;
      toast.error("No articles");
    });
  }
});

// export const { } = articlesSlice.actions;
export default articlesSlice.reducer;