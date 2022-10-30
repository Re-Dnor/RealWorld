import { Grid, Paper, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setAcitveFilter } from "../../store/articles-slice";
import { DataArticle } from "../Content/Content";
import { fetchArticles } from "../../store/articles-slice";

const tags = 
[ "all", "implementations", "welcome", "introduction", "codebaseShpw", "ipsum", "qui", "cupiditate", "deserunt" ];

function Sidebar({ page }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector((store: RootState) => store.articles);

  const handleUsedFilter = (tag: string): void => {
    const data: DataArticle = {
      count: page,
      filter: tag
    };

    dispatch(setAcitveFilter(tag));
    dispatch(fetchArticles(data));
  };

  return (
    <Grid item xs={12} md={4} mr={4} mt={8}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Popular Tags
      </Typography>
      {tags.map((tag) => (
        <Typography
          key={tag}
        >
          <Button
            color={tag === filter ? "primary" : "inherit"}
            onClick={() => handleUsedFilter(tag)}
            sx={{
              justifyContent: "flex-start",
              width: "100%"
            }}
          >{tag}
          </Button>
        </Typography>
      ))}
      </Paper>
    </Grid>
  );
}

export default Sidebar;