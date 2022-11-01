import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { SLICES_NAMES } from "../../utils/constants";
import { switchCurrentFeed, fetchArticlesMy, fetchArticles } from "../Article/slice/articles-slice";
import { HomeData } from "./Home";

type Props = {
  page: number;
  filter: string;
};

export type FeedsData = {
  currentPage: number;
  token: string
};

function Feeds({ page, filter }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentFeed } = useSelector((store: RootState) => store.articles);
  const { authorization, token } = useSelector((store: RootState) => store.auth);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    const data: FeedsData = {
      currentPage: page,
      token
    };

    dispatch(switchCurrentFeed(name));
    if (currentFeed === name) return;
    if (name === SLICES_NAMES.MY_FEED) dispatch(fetchArticlesMy(data));
    if (name === SLICES_NAMES.GLOBAL_FEED) {
      const data: HomeData = {
        currentPage: page,
        filter
      };
      dispatch(fetchArticles(data));
    }
  };

  return (
    <Box>
      {authorization &&
        <Button color={currentFeed === "my" ? "primary" : "inherit"} name="my" onClick={handleClick}>
          My Feed
        </Button>
      }
      <Button color={currentFeed === "global" ? "primary" : "inherit"} name="global" onClick={handleClick}>
        Global Feed
      </Button>
    </Box>
  );
}

export default Feeds;