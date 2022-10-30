import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Authorization/Login";
import Signup from "./Components/Authorization/Signup";
import NotFoundPage from "./Components/NotFoundPage";
import Article from "./Components/Article";
import Profile from "./Components/Profile";
import ContentLayout from "./Components/ContentLayout";

function App() {
  return (
    <>
      <Header />
      <ContentLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ContentLayout>
    </>
  );
}

export default App;
