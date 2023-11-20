import axios from "axios";

const API_URL = "http://localhost:8080/api/project/";

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

export const getProject = async (projectId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/project/get?id=${projectId}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
};
