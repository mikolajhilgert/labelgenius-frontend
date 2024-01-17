import axios from "axios";

const API_URL = process.env.REACT_APP_DOMAIN + "/api/project/invite";

export const inviteUser = async (inviteeEmail: string, projectId: string) => {
  const data = {
    inviteeEmail: inviteeEmail,
    projectId: projectId,
  };
  try {
    const response = await axios.post(API_URL, data, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.status === 200;
  } catch (error) {}
};
