import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { logout } from "../services/AuthService";

export default function Landing() {
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
        <Typography variant="h4" style={{ marginTop: "2rem" }}>
          Welcome user!
        </Typography>
      </div>
    </Container>
  );
}
