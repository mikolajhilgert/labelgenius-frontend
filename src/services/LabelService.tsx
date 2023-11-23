import axios from "axios";
import { Rectangle } from "../components/Rectangle";

const API_URL = "http://localhost:8080/api/project/label/";

export const getLabel = async (projectId: string, imageId: string) => {
  try {
    const data = {
      projectId: projectId,
      imageId: imageId,
    };
    const response = await axios.get(API_URL + "get", {
      params: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log("Error:", error.response.data);
    }
  }
};

export const saveLabel = async (
  projectId: string,
  imageId: string,
  labels: Rectangle[]
) => {
  const labelData = {
    projectId: projectId,
    imageId: imageId,
    labels: labels,
  };

  try {
    const response = await axios.post(API_URL + "save", labelData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response;
  } catch (error: any) {
    if (error.response) {
      console.log("Error:", error.response.data);
    }
  }
};
