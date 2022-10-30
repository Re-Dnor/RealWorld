import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Authorization/Login/Login";
import Signup from "./Components/Authorization/Signup";
import NotFound from "./Components/NotFound/NotFound";
import Article from "./Components/Article/Article";
import Profile from "./Components/Profile/Profile";
import ContentLayout from "./Components/ContentLayout/ContentLayout";

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ContentLayout>
    </>
  );
}

export default App;
