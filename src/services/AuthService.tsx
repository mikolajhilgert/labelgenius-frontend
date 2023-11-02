import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8080/api/auth/";

export const authenticateUser = async (email: string, password: string) => {
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
    localStorage.setItem("auth", "true"); // TODO: Implement state management with Redux
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

export const logOut = () => {
  localStorage.removeItem("auth");
  window.location.href = "./";
};

export const isAuthenticated = () => {
  return localStorage.getItem("auth") === "true";
};
