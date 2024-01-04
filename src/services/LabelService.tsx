import axios from "axios";
import { Rectangle } from "../components/Rectangle";

const API_URL = process.env.REACT_APP_DOMAIN + "/api/project/label/";

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

export const getAllLabels = async (projectId: string) => {
  try {
    const data = {
      projectId: projectId,
    };
    const response = await axios.get(API_URL + "getAllInProject", {
      params: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    const transformedData = response.data.map(
      (data: {
        labels: {
          x: any;
          y: any;
          width: any;
          height: any;
          id: any;
          className: any;
        }[];
      }) => {
        const transformedLabels = data.labels.map(
          (label: {
            x: any;
            y: any;
            width: any;
            height: any;
            id: any;
            className: any;
          }) => {
            const x1 = label.x;
            const y1 = label.y;
            const x2 = x1 + label.width;
            const y2 = y1;
            const x3 = x1 + label.width;
            const y3 = y1 + label.height;
            const x4 = x1;
            const y4 = y1 + label.height;

            return {
              id: label.id,
              className: label.className,
              x1,
              y1,
              x2,
              y2,
              x3,
              y3,
              x4,
              y4,
            };
          }
        );

        return {
          ...data,
          labels: transformedLabels,
        };
      }
    );

    return transformedData;
  } catch (error: any) {
    if (error.response) {
      console.log("Error:", error.response.data);
    }
  }
};
