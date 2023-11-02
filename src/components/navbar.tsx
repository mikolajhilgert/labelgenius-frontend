import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { isAuthenticated, logOut } from "../services/AuthService"; // Import your AuthService

const NavBar = () => {
  const handleLogout = () => {
    logOut();
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6" color="inherit" noWrap>
            <a href="./">LabelGenius</a>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 5 }}>
          <Link variant="button" color="text.primary" href="#" sx={{ my: 2 }}>
            Contact
          </Link>
          {isAuthenticated() ? (
            <Button onClick={handleLogout} variant="outlined" sx={{ my: 1 }}>
              Logout
            </Button>
          ) : (
            <Button href="login" variant="outlined" sx={{ my: 1 }}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
