import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import _ from "lodash";
import { Comment as Com } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Comment from "../Comment/Comment";

export default function CurrentArticle() {
  const article = useSelector((store: RootState) => store.currentArticle);
  const { comments: coms } = useSelector((store: RootState) => store.comments);

  const getComments = () => {
    return coms.map((com: Com ) => (
      <Comment key={_.uniqueId("comments-")} com={com} />
    ));
  };
  
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "15px", width: "100%" }}>
        <Avatar src={article.image} sx={{ marginBottom: "15px" }} />
        <Typography variant="h6">{article.title}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <Button>
            <Avatar sx={{ bgcolor: "pink" }}>
              <FavoriteIcon />
            </Avatar>
          </Button>
          <Typography>{article.favoritesCount}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%"
        }}
      >
        {getComments()}
      </Box>
      <Divider />
    </>
  );
}
