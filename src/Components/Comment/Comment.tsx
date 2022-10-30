import { Typography, CardContent, Card } from "@mui/material";
import { Comments } from "../../types";

type CommentProps = {
  com: Comments;
};

function Comment({ com }: CommentProps) {
  const date = new Date(com.createdAt);
  const localeDate = date.toLocaleDateString();

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {com.author.username}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {com.body}
        </Typography>
        <Typography variant="body2">{localeDate}</Typography>
      </CardContent>
    </Card>
  );
}

export default Comment;
