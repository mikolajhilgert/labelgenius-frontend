import axios from "axios";

const API_URL = process.env.REACT_APP_DOMAIN + "/api/project/invite";

export const inviteUser = async (inviteeEmail: string, projectId: string) => {
  const data = {
    inviteeEmail: inviteeEmail,
    projectId: projectId,
  };
  try {
    const response = await axios.get(API_URL, {
      data: data,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.status === 200;
  } catch (error) {}
};
