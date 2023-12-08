import axios from "axios";

const API_URL = process.env.REACT_APP_DOMAIN + "/api/project/";

interface LabelClass {
  name: string;
  color: string;
}

export const createProject = async (
  projectName: string,
  projectDescription: string,
  labelClasses: LabelClass[],
  formFiles: File[]
) => {
  const formData = new FormData();
  formData.append("ProjectName", projectName);
  formData.append("ProjectDescription", projectDescription);

  labelClasses.forEach((labelClass) => {
    formData.append(`LabelClasses[${labelClass.name}]`, labelClass.color);
  });

  formFiles.forEach((file) => {
    formData.append("FormFiles", file);
  });

  formData.append("IsActive", "true");

  try {
    const response = await axios.post(API_URL + "create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const updateProject = async (
  projectId: string,
  projectName: string,
  projectDescription: string,
  isActive: boolean
) => {
  const formData = new FormData();
  formData.append("ProjectId", projectId);
  formData.append("ProjectName", projectName);
  formData.append("ProjectDescription", projectDescription);
  formData.append("IsActive", isActive.toString());
  try {
    const response = await axios.post(API_URL + "create", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getProject = async (projectId: string) => {
  try {
    const response = await axios.get(API_URL + `get?id=${projectId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getAllProjects = async () => {
  try {
    const response = await axios.get(API_URL + "getAll", {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
