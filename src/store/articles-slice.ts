import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { DataArticle } from "../Components/Content/Content";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (data: DataArticle) => {
    const { count, filter } = data;
    let URL;
    console.log(filter, count);
    if (filter === "all") {
      URL = `https://api.realworld.io/api/articles?limit=5&offset=${count}`;
    } else {
      URL = `https://api.realworld.io/api/articles?tag=${filter}&limit=5&offset=${count}`;
    }

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
  loading: boolean;
  filter: string;
}

const initialState: ArticlesState = {
  articlesList: [],
  loading: false,
  filter: "all"
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setAcitveFilter: (state, action) => {
      state.filter = action.payload;
    }
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

export const { setAcitveFilter } = articlesSlice.actions;
export default articlesSlice.reducer;