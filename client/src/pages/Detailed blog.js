import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";