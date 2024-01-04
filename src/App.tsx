import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import "./App.css";
import Navbar from "./components/navbar";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import NotFoundPage from "./pages/not-found";
import HomePage from "./pages/home";
import LandingPage from "./pages/landing";
import LabelPage from "./pages/label";
import CreateProjectPage from "./pages/CreateProject";
import ViewProjectPage from "./pages/Project";
import EditProjectPage from "./pages/EditProject";
import { useEffect, useState } from "react";
import { isAuthenticated } from "./services/AuthService";
import ResetPasswordPage from "./pages/ResetPassword";
import ViewLabelsPage from "./pages/ViewLabels";

function App() {
  console.log("App rendered");
  let [authenticated, setAuthenticated] = useState(false);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      setLoading(true);
      const authStatus = await isAuthenticated();
      setAuthenticated(authStatus || false);
      setLoading(false);
    }

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/landing"
            element={authenticated ? <LandingPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/create"
            element={
              authenticated ? <CreateProjectPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/project/:projectId"
            element={
              authenticated ? <ViewProjectPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/project/label/:projectId"
            element={authenticated ? <LabelPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/project/edit/:projectId"
            element={
              authenticated ? <EditProjectPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/project/view-labels/:projectId"
            element={
              authenticated ? <ViewLabelsPage /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset_password" element={<ResetPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
