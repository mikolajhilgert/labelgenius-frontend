import axios from "axios";
import { Rectangle } from "../components/Rectangle";

const API_URL = "http://localhost:8080/api/project/label/";

export const getLabels = async (projectId: string) => {
  try {
    const data = {
      projectId: projectId,
    };
    const response = await axios.get(API_URL + "getAll", {
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

export const saveLabels = async (projectId: string, imageIds: string[]) => {
  let labelData = imageIds.map((imageId) => {
    let item = sessionStorage.getItem(imageId);
    if (item !== null) {
      return {
        projectId: projectId,
        imageId: imageId,
        labels: JSON.parse(item).map((rect: any) => new Rectangle(rect)),
      };
    }
  });

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
