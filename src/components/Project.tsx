import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../services/ProjectService";
import { inviteUser } from "../services/InvitationService";
import {
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";

const ProjectPage = () => {
  const { projectId = "" } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    const response = await inviteUser(email, projectId);
    if (response) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProject(projectId);
      if (response?.status === 200) {
        setProject(response.data);
        setLoading(false);
      } else {
        setError(response.error.response.data);
        setLoading(false);
      }
    };
    fetchData();
  }, [projectId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error loading project data. Please try again later.</div>;
  }

  if (!project) {
    return null;
  }

  const {
    id,
    projectName,
    projectDescription,
    projectCreator,
    labelClasses,
    images: imageDict,
    imageSasToken,
    creationDate,
    isActive,
    userIsOwner,
    labellingUsers,
  } = project;
  const images = Object.values(imageDict);
  const formattedCreationDate = new Date(creationDate).toLocaleString();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            {projectName}
          </Typography>
          <Divider style={{ marginBottom: 20 }} />
          <Typography variant="body1" paragraph>
            {projectDescription}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">
                <span style={{ fontWeight: "bold" }}> Date Created:</span>{" "}
                {formattedCreationDate}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                <span style={{ fontWeight: "bold" }}> Project Creator:</span>{" "}
                {projectCreator}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                <span style={{ fontWeight: "bold" }}> Label Classes:</span>{" "}
                {Object.entries(labelClasses).map(([key, value]) => (
                  <Typography
                    variant="body2"
                    key={key}
                    style={{ color: value as string }}
                  >
                    {`${key}`}
                  </Typography>
                ))}
              </Typography>
              <Chip
                label={isActive ? "Active project" : "Deactivated project"}
                color={isActive ? "success" : "error"}
              />
            </Grid>
            <Grid item xs={6}>
              <Box mt={2}>
                {userIsOwner && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginBottom: "5px" }}
                      href={`/project/edit/${id}`}
                    >
                      EDIT PROJECT
                    </Button>
                    <br></br>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginBottom: "5px" }}
                      href={`/project/view-labels/${id}`}
                    >
                      VIEW LABELS
                    </Button>
                    <br></br>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleClickOpen}
                    >
                      INVITE LABELLERS
                    </Button>
                    <br></br>
                    Current labellers: <br></br> {labellingUsers}
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Invite User</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          To invite a user to this project, please enter their
                          email address here.
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Email Address"
                          type="email"
                          fullWidth
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleSend} color="primary">
                          Send Invite
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                )}
                {!userIsOwner && (
                  <Button
                    variant="contained"
                    color="primary"
                    href={`/project/label/${id}`}
                  >
                    Label Project
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Carousel>
            {images.map((pic, index) => (
              <Box
                key={index}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  style={{
                    maxHeight: "400px",
                    maxWidth: "100%",
                    borderRadius: "8px",
                  }}
                  alt={`Project Image ${index}`}
                  src={`${pic}?${imageSasToken}`}
                />
              </Box>
            ))}
          </Carousel>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProjectPage;
