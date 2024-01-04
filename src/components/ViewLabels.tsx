import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TableHead,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { getAllLabels } from "../services/LabelService";
import { getProject } from "../services/ProjectService";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

type Label = {
  projectId: string;
  imageId: string;
  labels: any[];
  creator: string;
};

type Project = {
  id: string;
  projectName: string;
  projectDescription: string;
  projectCreator: string;
  labelClasses: any;
  images: any;
  imageSasToken: string;
  creationDate: string;
  labellingUsers: string[];
  isActive: boolean;
  userIsOwner: boolean;
};

const downloadLabels = (labels: any) => {
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(labels)], { type: "application/json" });
  element.href = URL.createObjectURL(file);
  element.download = "labels.json";
  document.body.appendChild(element);
  element.click();
};

const ViewLabels = () => {
  const { projectId = "" } = useParams();
  const [labels, setLabels] = useState<Label[] | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllLabels(projectId);
      console.log(response);
      setLabels(response);

      const response2 = await getProject(projectId);
      if (response2?.status === 200) {
        setProject(response2.data);
        console.log(response2.data);
      }
    };
    fetchData();
  }, [projectId]);

  const creators = labels
    ? Array.from(new Set(labels.map((label) => label.creator)))
    : [];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        variant="outlined"
      >
        <MenuItem value="">No Filter</MenuItem>
        {creators.map((creator) => (
          <MenuItem value={creator}>{creator}</MenuItem>
        ))}
      </Select>
      <br />
      {labels && project && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Download Labels</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {labels
                .filter((labelData: any) => labelData.creator.includes(filter))
                .map((labelData: any) => (
                  <TableRow key={labelData.imageId}>
                    <TableCell>
                      <img
                        src={`${project.images[labelData.imageId]}?${
                          project.imageSasToken
                        }`}
                        alt="label"
                        style={{
                          maxWidth: "300px",
                          maxHeight: "300px",
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => downloadLabels(labelData.labels)}
                      >
                        Download Labels
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewLabels;
