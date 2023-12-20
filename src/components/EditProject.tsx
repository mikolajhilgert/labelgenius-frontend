import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject, updateProject } from "../services/ProjectService";
import {
  Typography,
  Box,
  Container,
  CssBaseline,
  TextField,
  CircularProgress,
  Checkbox,
  Button,
  FormControlLabel,
} from "@mui/material";

const ProjectPage = () => {
  const { projectId = "" } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProject(projectId);
      if (response?.status === 200) {
        setProject(response.data);
        setProjectName(response.data.projectName);
        setDescription(response.data.projectDescription);
        setStatus(response.data.isActive);
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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (projectName && description && status) {
      updateProject(projectId, projectName, description, status);
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Edit project
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="projectName"
            label="Project Name"
            name="projectName"
            autoComplete="projectName"
            autoFocus
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={5}
            name="description"
            label="Description"
            type="text"
            id="description"
            autoComplete="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                name="status"
              />
            }
            label="Status"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProjectPage;
