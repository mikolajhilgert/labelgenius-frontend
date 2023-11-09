import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import NotFoundPage from "./pages/not-found";
import PrivateRoute, { ProtectedRouteProps } from "./components/privateroute";
import HomePage from "./pages/home";
import { isAuthenticated } from "./services/AuthService";
import LandingPage from "./pages/landing";
import LabelPage from "./pages/label";

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
  isAuthenticated: isAuthenticated() || false,
  authenticationPath: "/login",
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute
                {...defaultProtectedRouteProps}
                outlet={<LandingPage />}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/label" element={<LabelPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
