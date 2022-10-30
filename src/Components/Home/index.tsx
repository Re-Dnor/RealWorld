import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Pagination, Stack, Button } from "@mui/material";
import * as _ from "lodash";
import ArticleCard from "./ArticleCard";
import Progress from "../Progress/Progress";
import { AppDispatch, RootState } from "../../store/store";
import { fetchArticles } from "../Article/articles-slice";
import Sidebar from "../Sidebar";
import { Article } from "../../types";

export type DataArticle = {
  count: number;
  filter: string;
};

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { articlesList, loading, filter } = useSelector((store: RootState) => store.articles);
  const [ page, setPage ] = useState<number>(1);

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ariaLabel = e.currentTarget.ariaLabel;
    const currentNumber = Number(ariaLabel[ariaLabel.length - 1]);
    const data: DataArticle = {
      count: currentNumber,
      filter
    };
    setPage(currentNumber);
    dispatch(fetchArticles(data));
  };

  useEffect(() => {
    const data: DataArticle = {
      count: page,
      filter
    };
    dispatch(fetchArticles(data));
  }, []);

  return (
    <>
      <Sidebar page={page} />
      <Box
        sx={{
          marginTop: 8,
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
            {articlesList.map((artcl: Article) => (
              <ArticleCard key={_.uniqueId("card-")} artcl={artcl} />
            ))}
            <Stack>
              <Pagination page={page} count={5} color="primary" onChange={handleChange} />
            </Stack>
          </>
        )}
      </Box>
    </>
  );
}
