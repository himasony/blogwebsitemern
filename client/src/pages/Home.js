import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Box>
      <Typography variant="h3" textAlign="center" margin={4} color="black">
        All Blogs
      </Typography>
      {loading ? (
        <Typography variant="h5" textAlign="center">Loading...</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Box key={blog._id} mb={2} mx={2} width="80%">
                <BlogCard
                  id={blog._id}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  username={blog.user?.username || "Unknown User"}
                  time={blog.createdAt}
                  isUser={localStorage.getItem("userId") === blog.user?._id}
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

export default HomePage;
