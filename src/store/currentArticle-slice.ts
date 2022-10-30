import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

export const fetchSlug = createAsyncThunk(
  "currentArticle/fetchArticle",
  async (slug: string) => {
    const URL = `https://api.realworld.io/api/articles/${slug}`;
    const response = await fetch(URL);
    return response.json();
  }
);

export interface currentArticleState {
  [key: string] : string
}

const initialState: currentArticleState = {
  title: null,
  body: null,
  description: null,
  username: null,
  image: null,
  favoritesCount: null
};

export const currentArticle = createSlice({
  name: "currentArticle",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSlug.fulfilled, (state, action) => {
      state.title = action.payload.article.title;
      state.body = action.payload.article.body; 
      state.description = action.payload.article.description;
      state.username = action.payload.article.author.username;
      state.image = action.payload.article.author.image;
      state.favoritesCount = action.payload.article.favoritesCount;
    });
    builder.addCase(fetchSlug.rejected, (state, action) => {
      console.log("___ERRROR");
      console.log(state, action.payload);
    });
  }
});


export default currentArticle.reducer;