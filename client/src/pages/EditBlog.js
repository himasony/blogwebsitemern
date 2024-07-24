import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/v1/blog/get-blog/${id}`);
        if (data?.success) {
          setBlog(data.blog);
          setTitle(data.blog.title);
          setDescription(data.blog.description);
          setImage(data.blog.image);
        }
      } catch (error) {
        console.error("Error fetching blog details", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/blog/update-blog/${id}`, {
        title,
        description,
        image
      });
      if (data?.success) {
        alert("Blog updated successfully.");
        navigate("/admin-page"); // Redirect to admin page
      } else {
        alert("Failed to update the blog.");
      }
    } catch (error) {
      console.error("Error updating blog", error);
      alert("Error updating blog.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" textAlign="center" margin={4}>
        Edit Blog
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" width="50%" mx="auto">
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
          Update Blog
        </Button>
      </Box>
    </Box>
  );
};

export default EditBlog;
