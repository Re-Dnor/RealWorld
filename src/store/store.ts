import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articles-slice";
import currentArticleReducer from "./currentArticle-slice";
import commentsReduce from "./comments-slice";
import authReducer from "./auth-slice";

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    currentArticle: currentArticleReducer,
    comments: commentsReduce,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;