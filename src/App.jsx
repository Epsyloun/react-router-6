import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, CheckRoute } from "./auth/auth";
import { Blog } from "./Components/Blog";
import { BlogForm } from "./Components/BlogForm";
import { BlogPost } from "./Components/BlogPost";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Logout } from "./Components/Logout";
import { Menu } from "./Components/Menu";
import { Profile } from "./Components/Profile";
import { ProfileEdit } from "./Components/ProfileEdit";
import { BlogInfoProvider } from "./context/useBlogInfo";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <BlogInfoProvider>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />}>
              <Route path=":slug" element={<BlogPost />} />
            </Route>
            <Route
              path="/blog-form"
              element={
                <CheckRoute>
                  <BlogForm />
                </CheckRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route
              path="/logout"
              element={
                <CheckRoute>
                  <Logout />
                </CheckRoute>
              }
            />
            <Route path="/profile/:slug" element={<Profile />} />
            <Route path="/profile-edit" element={<CheckRoute><ProfileEdit /></CheckRoute>} />
            <Route path="*" element={<p>not found</p>} />
          </Routes>
        </BlogInfoProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
