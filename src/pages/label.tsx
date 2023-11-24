import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Label from "../components/label";
import { getProject } from "../services/ProjectService";
import { getLabels, saveLabels } from "../services/LabelService";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import ObjectID from "bson-objectid";
import Button from "@mui/material/Button";

interface Project {
  id: string;
  projectName: string;
  projectDescription: string;
  projectCreator: string;
  labelClasses: {
    [key: string]: string;
  };
  images: {
    [key: string]: string;
  };
  imageSasToken: string;
  creationDate: string;
  isActive: boolean;
  userIsOwner: boolean;
}

interface ImageElementProps {
  imageElement: string;
  labelClasses: {
    [key: string]: string;
  };
  projectId: string;
  imageId: string;
  prevImageId: string;
}

const LabelPage: React.FC = () => {
  const { projectId = "" } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [page, setPage] = useState(1);
  const [imageId, setImageId] = useState("");
  const [prevImageId, setPrevImageId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProject(projectId);
      if (response.status === 200) {
        setProject(response.data);
        const id = Object.keys(response.data.images)[0];
        setImageId(id);
      }

      const labels = await getLabels(projectId);
      labels?.data.forEach((item: any) => {
        const mappedLabels = item.labels?.map(
          (data: {
            x: any;
            y: any;
            width: any;
            height: any;
            id: string;
            className: string;
          }) => {
            console.log(project);
            const newRect = {
              x: data.x,
              y: data.y,
              width: data.width,
              height: data.height,
              id: ObjectID(data.id).toHexString(),
              labelClass: data.className,
              color: response.data.labelClasses[data.className],
              startX: 0,
              startY: 0,
            };
            // Store the rectangle data in the session storage
            return newRect;
          }
        );
        sessionStorage.setItem(item.imageId, JSON.stringify(mappedLabels));
      });
    };
    fetchData();
  }, [projectId]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // Update the previous image ID before setting the new one
    setPrevImageId(imageId);

    const id = Object.keys(project?.images || {})[value - 1];
    setImageId(id);
    setPage(value);
  };

  const imageElementProps: ImageElementProps = {
    imageElement: project?.images[imageId] + "?" + project?.imageSasToken || "",
    labelClasses: project?.labelClasses || {},
    projectId: projectId,
    imageId: imageId,
    prevImageId: prevImageId,
  };

  return (
    <>
      <Label {...imageElementProps} />
      <Box display="flex" justifyContent="center">
        <Pagination
          count={Object.keys(project?.images || {}).length}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (project && project.images) {
            saveLabels(projectId, Array.from(Object.keys(project.images)));
          }
        }}
      >
        Save Labels
      </Button>
    </>
  );
};

export default LabelPage;
