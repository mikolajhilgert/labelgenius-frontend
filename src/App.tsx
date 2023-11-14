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
import { useEffect, useState } from "react";
import { isAuthenticated } from "./services/AuthService";

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
  }, []); // Add an empty array here

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
            path="/home"
            element={authenticated ? <LandingPage /> : <Navigate to="/login" />}
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
