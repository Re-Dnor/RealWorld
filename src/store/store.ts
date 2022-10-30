import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "../Components/Article/slice/articles-slice";
import currentArticleReducer from "../Components/Article/slice/currentArticle-slice";
import commentsReduce from "../Components/Comment/slice/comments-slice";
import authReducer from "../Components/Authorization/slice/auth-slice";

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