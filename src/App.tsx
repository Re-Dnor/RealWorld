import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Content from "./Components/Content/Content";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage";
import Article from "./Components/Article/Article";
import Profile from "./Components/Profile/Profile";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Content />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/article/:slug" element={<Article />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}

export default App;
