import { Grid, Paper, Typography, Link, Stack } from "@mui/material";

const tags = [ "implementations", "welcome", "introduction", "codebaseShpw", "ipsum", "qui", "cupiditate", "deserunt" ];

function Sidebar() {
  return (
    <Grid item xs={12} md={4} mr={4} mt={8}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Popular Tags
      </Typography>
      {tags.map((tag) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={tag}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <span>{tag}</span>
          </Stack>
        </Link>
      ))}
      </Paper>
    </Grid>
  );
}

export default Sidebar;