import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Authorization/Login/Login";
import Signup from "./Components/Authorization/Signup";
import NotFound from "./Components/NotFound/NotFound";
import Article from "./Components/Article/Article";
import Profile from "./Components/Profile/Profile";
import ContentLayout from "./Components/ContentLayout/ContentLayout";
import { useEffect } from "react";
import { login, getData } from "./Components/Authorization/slice/auth-slice";

function App() {
  const { authorization } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const localEmail = localStorage.getItem("email");
    if (token) {
      dispatch(login());
      dispatch(getData({ email: localEmail }));
    }
  }, []);

  return (
    <>
      <Header />
      <ContentLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={ authorization ? <Profile /> : <Navigate to="/"/>} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ContentLayout>
    </>
  );
}

export default App;
