import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, CssBaseline, Box, Pagination, Stack, Button, Grid } from "@mui/material";
import * as _ from "lodash";
import CardWrapper from "./CardWrapper";
import Progress from "../Progress/Progress";
import { AppDispatch, RootState } from "../../store/store";
import { fetchArticles, Article } from "../../store/articles-slice";
import Sidebar from "../Sidebar/Sidebar";

function Content() {
  const [ page, setPage ] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { articlesList, loading } = useSelector((store: RootState) => store.articles);

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ariaLabel = e.currentTarget.ariaLabel;
    const currentNumber = +ariaLabel[ariaLabel.length - 1];
    setPage(currentNumber);
    dispatch(fetchArticles(currentNumber));
  };

  useEffect(() => {
    dispatch(fetchArticles(page));
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
        <Sidebar/>
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
              <Button color="inherit">huehue</Button>
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