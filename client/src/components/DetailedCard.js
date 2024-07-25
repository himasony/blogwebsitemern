import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import { Box, IconButton, TextField, Button } from "@mui/material";
import axios from "axios";

export default function DetailedCard({
  title,
  description,
  image,
  username = "User",
  time,
  id,
  isUser,
  likes,
  comments,
})  {
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState(likes);
  const [commentList, setCommentList] = useState([]);

  console.log(image);
  useEffect(() => {
    if (comments) {
      setCommentList(comments);
    }
  }, [comments]);

  useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  useEffect(() => {
    console.log("Updated likeCount:", likeCount);
  }, [likeCount]);

  useEffect(() => {
    console.log("Updated commentList:", commentList);
  }, [commentList]);


  const handleLike = async () => {
    try {
      const { data } = await axios.post(`http://localhost:8080/api/v1/blog/like/${id}`);
      if (data?.success) {
        setLikeCount(likeCount + 1);
      } else {
        console.error("Failed to like the blog");
      }
    } catch (error) {
      console.error("Error liking the blog", error);
    }
  };
  const handleComment = async () => {
    try {
      const { data } = await axios.post(`http://localhost:8080/api/v1/blog/comment/${id}`, {
        comment: newComment,
      });
      if (data?.success) {
        setCommentList([...commentList, newComment]);
        setNewComment("");
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/blog/${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Blog URL copied to clipboard!");
    });
  };

  return (
    <Card
      sx={{
        width: "90%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username.charAt(0)}
          </Avatar>
        }
        title={username}
        subheader={new Date(time).toLocaleDateString()}
        action={
          <Box display="flex" justifyContent="flex-end">
            {/* Any additional actions can be placed here */}
          </Box>
        }
      />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Title: {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
        <Box mt={2} display="flex" alignItems="center">
          <IconButton onClick={handleLike} color="primary">
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="body2" color="textSecondary">{likeCount} Likes</Typography>
          <IconButton onClick={handleShare} color="primary">
            <ShareIcon />
          </IconButton>
        </Box>
        <Box mt={2}>
          <Typography variant="h6">Comments</Typography>
          {commentList.map((comment, index) => (
            <Typography key={index} variant="body2" color="textSecondary">{comment}</Typography>
          ))}
          <Box mt={2} display="flex" alignItems="center">
            <TextField
              label="Add a comment"
              variant="outlined"
              size="small"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleComment} sx={{ ml: 1 }}>
              Comment
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
