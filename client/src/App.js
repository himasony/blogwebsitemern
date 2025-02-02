import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import HelloWorld from "./pages/AdminPage"; // Import the HelloWorld component
import AdminPage from './pages/AdminPage';
import EditBlog from './pages/EditBlog';
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Home";
import Detailedblog from "./pages/Detailed blog";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} /> 
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/detail-blog/:id" element={<Detailedblog />} />
      </Routes>
    </>
  );
}

export default App;
