import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
export const authenticateUser = async (
  email: string,
  password: string
): Promise<[boolean, string]> => {
  const loginCreds = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(API_URL + "login", loginCreds, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return [true, response.data];
  } catch (error: any) {
    if (error.response) {
      const jsonMatch = error.response.data.match(/"message": "(.*?)",/);
      if (jsonMatch) {
        return [false, jsonMatch[1]];
      }
      return [false, error.response.data];
    }
    return [false, "An unknown error occurred"];
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const registrationData = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(API_URL + "register", registrationData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const jsonMatch = error.response.data.match(/"message": "(.*?)",/);
      if (jsonMatch) {
        return jsonMatch[1];
      }
      return error.response.data;
    }
  }
};

export const isAuthenticated = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/auth/status", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.status === 200;
  } catch (error) {}
};

export const logout = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/api/auth/logout",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      window.location.href = "/login";
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {}
};
