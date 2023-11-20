import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Label from "../components/label";
import { getProject } from "../services/ProjectService";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

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
}

const LabelPage: React.FC = () => {
  const { projectId = "" } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [page, setPage] = useState(1);
  const [imageId, setImageId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProject(projectId);
      if (response.status === 200) {
        setProject(response.data);
        const id = Object.keys(response.data.images)[0];
        setImageId(id);
      }
    };
    fetchData();
  }, [projectId]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    const id = Object.keys(project?.images || {})[value - 1];
    setImageId(id);
  };

  const imageElementProps: ImageElementProps = {
    imageElement: project?.images[imageId] + "?" + project?.imageSasToken || "",
    labelClasses: project?.labelClasses || {},
    projectId: projectId,
    imageId: imageId,
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
    </>
  );
};

export default LabelPage;
