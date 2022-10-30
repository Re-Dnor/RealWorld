import { useNavigate } from "react-router-dom";
import * as _ from "lodash";
import { Typography, Button, CardContent, CardActions, Card } from "@mui/material";
import { Article } from "../../types";

type ArticleCardProps = {
  artcl: Article;
};

export default function ArticleCard({ artcl }: ArticleCardProps) {
  const navigate = useNavigate();

  const getLocaleDate = (createdAt: string): string => {
    const date = new Date(createdAt);
    return date.toLocaleDateString();
  };

  const handleReadingArticle = (slug: string): void => {
    navigate(`/article/${slug}`);
  };

  return (
    <Card sx={{ minWidth: "60vw" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {artcl.title}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {getLocaleDate(artcl.createdAt)}
        </Typography>
        <Typography variant="body2">
          {artcl.tagList.map((tag: string) => (
            <Button key={_.uniqueId("tag-")} disabled color="inherit" variant="text">
              {tag}
            </Button>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleReadingArticle(artcl.slug)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
