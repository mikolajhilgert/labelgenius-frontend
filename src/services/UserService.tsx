const API_URL = process.env.REACT_APP_DOMAIN + "/api/me/";

export const deleteAccount = async () => {
  try {
    const response = await fetch(API_URL + "delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 200) {
      window.location.href = "/login";
    }
  } catch (error) {}
};
