import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import yourImage from "../assets/label-genius-black-blue.png"; // Import your image
import { Grid } from "@mui/material";

export default function Home() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={yourImage}
          alt="Label Genius"
          style={{ width: "350px", height: "200px" }}
        />
        <Typography variant="h6" style={{ marginTop: "1rem" }}>
          Your Data Labeling Solution
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Grid container spacing={1}>
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
            <Grid item>|</Grid> {/* Separator */}
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
  );
}
