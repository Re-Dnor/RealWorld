import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  Box } from "@mui/material";
import Progress from "../Progress/Progress";
import { AppDispatch, RootState } from "../../store/store";
import { fetchSlug } from "./slice/currentArticle-slice";
import { fetchComments } from "../Comment/slice/comments-slice";
import CurrentArticle from "./CurrentArticle";

export default function Article() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((store: RootState) => store.comments);
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchSlug(slug));
    dispatch(fetchComments(slug));
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {loading ? <Progress /> : <CurrentArticle/>}
    </Box>
  );
}
