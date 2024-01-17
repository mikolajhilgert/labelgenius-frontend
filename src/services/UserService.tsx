import axios from "axios";

const API_URL = process.env.REACT_APP_DOMAIN + "/api/me/";

export const deleteAccount = async () => {
  try {
    const response = await axios.get(API_URL + "delete", {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      window.location.href = "/login";
    }
  } catch (error) {}
};
