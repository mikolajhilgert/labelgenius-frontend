import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  CssBaseline,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Link,
} from "@mui/material";
import { getAllProjects } from "../services/ProjectService";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<
    [
      string,
      {
        name: string;
        description: string;
        isProjectCreator: string;
        dateCreated: string;
        isActive: string;
      }
    ][]
  >([]);

  useEffect(() => {
    getAllProjects()
      .then((response) => {
        setProjects(Object.entries(response.data));
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="h4">Welcome!</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Here are your projects. Active projects are on the left and inactive
          projects are on the right.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ mt: 2 }}>
              Active Projects
            </Typography>
            {projects
              .filter(([id, project]) => project.isActive === "True")
              .map(([id, project]) => (
                <Card key={id} sx={{ mt: 2, width: "100%" }}>
                  <CardContent>
                    <Typography variant="h6">{project.name}</Typography>
                    <Typography variant="body1">{`Description: ${project.description}`}</Typography>
                    <Typography variant="body2">{`Date Created: ${project.dateCreated}`}</Typography>
                    {project.isProjectCreator === "True" && (
                      <Chip label="Project Creator" color="primary" />
                    )}
                    {project.isProjectCreator === "False" && (
                      <Chip label="Project Labeller" color="secondary" />
                    )}
                    <br></br>
                    <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                      <Link
                        href={`project/${id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        View Project
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ mt: 2 }}>
              Inactive Projects
            </Typography>
            {projects
              .filter(([id, project]) => project.isActive === "False")
              .map(([id, project]) => (
                <Card
                  key={id}
                  sx={{ mt: 2, width: "100%", bgcolor: "grey.300" }}
                >
                  <CardContent>
                    <Typography variant="h6">{project.name}</Typography>
                    <Typography variant="body1">{`Description: ${project.description}`}</Typography>
                    <Typography variant="body2">{`Date Created: ${project.dateCreated}`}</Typography>
                    {project.isProjectCreator === "True" && (
                      <Chip label="Project Creator" color="primary" />
                    )}
                    {project.isProjectCreator === "False" && (
                      <Chip label="Project Labeller" color="secondary" />
                    )}
                    <br></br>
                    <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                      <Link
                        href={
                          process.env.REACT_APP_DOMAIN +
                          `/api/project/get?id=${id}`
                        }
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        View Project
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProjectsPage;
