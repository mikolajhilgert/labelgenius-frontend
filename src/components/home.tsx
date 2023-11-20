import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

import yourImage from "../assets/label-genius-black-blue.png";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div
          style={{
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={yourImage}
            alt="Label Genius"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "4px",
            }}
          />
          <Typography
            variant="h4"
            style={{ marginTop: "1.5rem", color: "#333" }}
          >
            Your Data Labeling Solution
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ marginTop: "1rem", color: "#666" }}
          >
            We make data labeling simple and efficient for your projects.
          </Typography>
          <div style={{ marginTop: "2rem" }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  color="primary"
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  style={{ margin: "0 0.5rem", color: "#666" }}
                >
                  or
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  color="primary"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
