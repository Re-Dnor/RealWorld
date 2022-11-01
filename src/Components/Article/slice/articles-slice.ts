import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Article } from "../../../types";
import { BASE_URL, SLICES_NAMES } from "../../../utils/constants";
import { HomeData } from "../../Home/Home";
import { FeedsData } from "../../Home/Feeds";

export interface ArticlesState {
  articlesList: Article[];
  loading: boolean;
  currentFeed: SLICES_NAMES.MY_FEED | SLICES_NAMES.GLOBAL_FEED;
  filter: string;
}

const initialState: ArticlesState = {
  articlesList: [],
  currentFeed: SLICES_NAMES.GLOBAL_FEED,
  loading: false,
  filter: "all"
};

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async (data: HomeData) => {
  const { currentPage, filter } = data;
  let URL: string;
  if (filter === "all") {
    URL = `${BASE_URL}/articles?limit=5&offset=${currentPage}`;
  } else {
    URL = `${BASE_URL}/articles?tag=${filter}&limit=5&offset=${currentPage}`;
  }
  const response = await fetch(URL);
  return response.json();
});

export const fetchArticlesMy = createAsyncThunk("articles/fetchArticlesMy", async (data: FeedsData) => {
  const { currentPage, token } = data;
  const URL = `${BASE_URL}/articles/feed?limit=5&offset=${currentPage}`;
  const response = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  return response.json();
});

export const articlesSlice = createSlice({
  name: SLICES_NAMES.ARTICLES,
  initialState,
  reducers: {
    setActiveFilter: (state, action) => {
      state.filter = action.payload;
    },
    switchCurrentFeed: (state, action) => {
      state.currentFeed = action.payload;
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
    // MY ARTICLES
    builder.addCase(fetchArticlesMy.fulfilled, (state, action) => {
      state.loading = false;
      state.articlesList = action.payload.articles;
    });
    builder.addCase(fetchArticlesMy.rejected, (state) => {
      state.loading = false;
      toast.error("No articles");
    });
  }
});

export const { setActiveFilter, switchCurrentFeed } = articlesSlice.actions;
export default articlesSlice.reducer;
