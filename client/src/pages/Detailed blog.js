import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button,TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import DetailedCard from "../components/DetailedCard";

const Detailedblog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();
  
useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log(id);
        const { data } = await axios.get(`http://localhost:8080/api/v1/blog/get-blog/${id}`);
        if (data?.success) {
          setBlog(data.blog);
        }
      } catch (error) {
        console.error("Error fetching blog details", error);
      }
    };
    fetchBlog();
  }, [id]);
  
    return (
      <DetailedCard
                  
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
  );
};
export default Detailedblog;