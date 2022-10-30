import { ReactNode } from "react";
import { Box, Container, CssBaseline } from "@mui/material";

type ContentLayoutProps = {
  children: ReactNode | ReactNode[]
};

export default function ContentLayout(props: ContentLayoutProps) {
  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start"
        }}
      >
        {props.children}
      </Box>
    </Container>
  );
}
