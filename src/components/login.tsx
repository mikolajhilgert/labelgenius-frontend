import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { LockOutlined } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { authenticateUser } from "../services/AuthService";

export default function SignIn() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (email && password) {
      const authenticationResult = await authenticateUser(
        email.toString(),
        password.toString()
      );
      if (authenticationResult?.[0] === true) {
        window.location.href = "/landing";
      }
      setMessage(authenticationResult?.[1]);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            data-cy="button"
          >
            Login
          </Button>
          {message && (
            <Typography
              variant="body1"
              color={message.includes("successfully") ? "green" : "error"}
            >
              {message}
            </Typography>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="reset_password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Link onClick={handleOpen} variant="body2">
                Privacy Policy
              </Link>
              <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Privacy Policy</DialogTitle>
                <DialogContent>
                  <code style={{ whiteSpace: "pre-wrap" }}>
                    {`
                    1. Introduction
                    By accessing or using the LabelGenius platform ("Platform") and its services ("Services"), you agree to comply with these Terms and Conditions. These Terms and Conditions govern the use of the Platform and the processing of personal data in accordance with the General Data Protection Regulation (GDPR).

                    2. Data Collection and Processing
                    LabelGenius collects and processes personal data in accordance with its Privacy Policy, which outlines the types of data collected, the purposes of processing, and the rights of users. By using the Platform, you consent to the collection and processing of your personal data as described in the Privacy Policy.
                    
                    3. User Responsibilities
                    You are responsible for the accuracy and legality of any personal data you provide or upload to the Platform. You should ensure that you have obtained the necessary consents and permissions from individuals whose personal data you share through the Platform.
                    
                    4. Security Measures
                    You are responsible for the accuracy and legality of any personal data you provide or upload to the Platform. You should ensure that you have obtained the necessary consents and permissions from individuals whose personal data you share through the Platform. LabelGenius implements appropriate technical and organizational measures to protect the security and confidentiality of personal data. However, no data transmission or storage system can be guaranteed to be 100% secure. You understand and accept the inherent risks associated with the transmission and storage of personal data.
                    
                    5. Data Subject Rights
                    As a user of the Platform, you have the right to access, rectify, erase, restrict processing, and object to the processing of your personal data. You can exercise these rights by contacting LabelGenius as described in the Privacy Policy.
                    
                    6. Third-Party Services and Links
                    The Platform may contain links to third-party websites or services that are not controlled or operated by LabelGenius. LabelGenius is not responsible for the privacy practices or content of those third-party sites. Your interactions with such sites are governed by their own terms and policies.
                    
                    7. Disclaimer of Liability
                    LabelGenius shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the Platform or any actions taken in reliance on the content or information provided. LabelGenius does not guarantee the accuracy, completeness, or reliability of any content or information on the Platform.
                    
                    8. Governing Law and Jurisdiction
                    These Terms and Conditions are governed by the laws of [Jurisdiction]. Any disputes arising from or relating to these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].
                    
                    9. Modifications
                    LabelGenius reserves the right to modify or update these Terms and Conditions at any time. Any changes will be effective upon posting on the Platform. Continued use of the Platform after the changes indicates your acceptance of the modified Terms and Conditions.
                    
                    Contact
                    If you have any questions or concerns regarding these Terms and Conditions or the privacy practices, please contact LabelGenius.
                  `}
                  </code>
                </DialogContent>
              </Dialog>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
