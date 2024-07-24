import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllBlogs = async () => {
    try {
      console.log("Fetching blogs...");
      const { data } = await axios.get("http://localhost:8080/api/v1/blog/all-blog");
      console.log("Blogs fetched: ", data);
      if (data?.success) {
        setBlogs(data.blogs || []);
      } else {
        console.error("No blogs found");
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        alert("Blog deleted successfully.");
      } else {
        alert("Failed to delete the blog.");
      }
    } catch (error) {
      console.error("Error deleting blog", error);
      alert("Error deleting blog.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <Typography variant="h3" textAlign="center" margin={4} color="white">
        All Blogs
      </Typography>
      {loading ? (
        <Typography variant="h5" textAlign="center">Loading...</Typography>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Box key={blog._id} mb={2} width="80%">
                <Box display="flex" justifyContent="flex-end" mb={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(blog._id)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </Button>
                </Box>
                <BlogCard
                  id={blog._id}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  username={blog.user?.username || "Unknown User"}
                  time={blog.createdAt}
                  isUser={false}
                  likes={blog.likes} 
                  comments={blog.comments} 
                />
              </Box>
            ))
          ) : (
            <Typography variant="h5">No blogs found</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AdminPage;
