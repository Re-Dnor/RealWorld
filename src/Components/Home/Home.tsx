import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Pagination, Stack, Button, Typography } from "@mui/material";
import * as _ from "lodash";
import ArticleCard from "./ArticleCard";
import Progress from "../Progress/Progress";
import Sidebar from "../Sidebar/Sidebar";
import { Article } from "../../types";
import { AppDispatch, RootState } from "../../store/store";
import { fetchArticles } from "../Article/slice/articles-slice";

export type HomeData = {
  currentPage: number;
  filter: string;
};

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { articlesList, loading, filter } = useSelector((store: RootState) => store.articles);
  const [ page, setPage ] = useState<number>(1);
  const [ pagesCount, setPagesCount ] = useState<number>(0);

  useEffect(() => {
    const data: HomeData = {
      currentPage: page,
      filter
    };
    dispatch(fetchArticles(data));
    setPagesCount(articlesList.length);
  }, [ articlesList.length ]);

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const ariaLabel = e.currentTarget.ariaLabel;
    const currentNumber = Number(ariaLabel[ariaLabel.length - 1]);
    const data: HomeData = {
      currentPage: currentNumber,
      filter
    };
    setPage(currentNumber);
    dispatch(fetchArticles(data));
  };

  const getArticlesList = () => {
    if (!articlesList.length) return <Typography>Articles are not found.</Typography>;
    return articlesList.map((artcl: Article) => (
      <ArticleCard key={_.uniqueId("card-")} artcl={artcl} />
    ));
  };

  return (
    <>
      <Sidebar page={page} />
      <Box
        sx={{
          marginBottom: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: 5
        }}
      >
        <Button color="primary" name="profile">
          Global Feed
        </Button>
        {loading ? (
          <Progress />
        ) : (
          <>
            { getArticlesList() }
            <Stack>
              <Pagination page={page} count={pagesCount} color="primary" onChange={handleChange} />
            </Stack>
          </>
        )}
      </Box>
    </>
  );
}
