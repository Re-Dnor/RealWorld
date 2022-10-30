import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
import { Container, Typography, Divider, CssBaseline, Box, Avatar, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Comment from "../Comment/Comment";
import Progress from "../Progress/Progress";
import { AppDispatch, RootState } from "../../store/store";
import { fetchSlug } from "./currentArticle-slice";
import { fetchComments } from "../Comment/comments-slice";
import { Comments } from "../../types";

export default function Article() {
  const dispatch = useDispatch<AppDispatch>();
  const article = useSelector((store: RootState) => store.currentArticle);
  const { comments: coms, loading } = useSelector((store: RootState) => store.comments);
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchSlug(slug));
    dispatch(fetchComments(slug));
  }, []);

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {loading ? (
          <Progress />
        ) : (
          <>
            <Avatar src={article.image} />
            <Typography variant="h6">{article.title}</Typography>
            <Button>
              <Avatar sx={{ bgcolor: "pink" }}>
                <FavoriteIcon />
              </Avatar>
            </Button>
            {article.favoritesCount}
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2
              }}
            >
              {coms.map((com: Comments) => (
                <Comment key={_.uniqueId("comments-")} com={com} />
              ))}
            </Box>
            <Divider />
          </>
        )}
      </Box>
    </Container>
  );
}
