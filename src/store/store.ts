import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "../Components/Article/articles-slice";
import currentArticleReducer from "../Components/Article/currentArticle-slice";
import commentsReduce from "../Components/Comment/comments-slice";
import authReducer from "../Components/Authorization/auth-slice";

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