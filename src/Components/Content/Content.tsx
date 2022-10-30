import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, CssBaseline, Box, Pagination, Stack, Button } from "@mui/material";
import * as _ from "lodash";
import CardWrapper from "./CardWrapper";
import Progress from "../Progress/Progress";
import { AppDispatch, RootState } from "../../store/store";
import { fetchArticles, Article } from "../../store/articles-slice";
import Sidebar from "../Sidebar/Sidebar";

export type DataArticle = {
  count: number,
  filter: string
};

function Content() {
  const [ page, setPage ] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { articlesList, loading, filter } = useSelector((store: RootState) => store.articles);

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ariaLabel = e.currentTarget.ariaLabel;
    const currentNumber = +ariaLabel[ariaLabel.length - 1];
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
    <Container component="main" >
      <CssBaseline />
      <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start"
      }}>
        <Sidebar page={page}/>
        <Box
        sx={{
          marginTop: 8,
          marginBottom: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: 5
        }}>
            <Box>
              <Button color="primary" name="profile">Global Feed</Button>
            </Box>
            { 
              loading ? <Progress/>
              :
              <>
                { articlesList.map((artcl: Article) => <CardWrapper key={_.uniqueId("card-")} artcl={artcl}/>) }
                <Stack>
                  <Pagination page={page} count={5} color="primary" onChange={handleChange} />
                </Stack>
              </>
            }
          </Box>
          
        </Box>
    </Container>
  );
}

export default Content;