import { Grid, Paper, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setActiveFilter } from "../Article/slice/articles-slice";
import { HomeData } from "../Home/Home";
import { fetchArticles } from "../Article/slice/articles-slice";
import { SLICES_NAMES, TAGS } from "../../utils/constants";

type SidebarProps = {
  page: number;
};

export default function Sidebar({ page }: SidebarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { filter, currentFeed } = useSelector((store: RootState) => store.articles);

  const handleUsedFilter = (tag: string): void => {
    const data: HomeData = {
      currentPage: page,
      filter: tag
    };
    dispatch(setActiveFilter(tag));
    if (currentFeed === SLICES_NAMES.GLOBAL_FEED) dispatch(fetchArticles(data));
  };

  return (
    <Grid item xs={12} md={4} mr={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Popular Tags
        </Typography>
        { TAGS.map((tag) => (
          <Typography key={tag}>
            <Button
              color={tag === filter ? "primary" : "inherit"}
              onClick={() => handleUsedFilter(tag)}
              sx={{
                justifyContent: "flex-start",
                width: "100%"
              }}
            >
              {tag}
            </Button>
          </Typography>
        )) }
      </Paper>
    </Grid>
  );
}
