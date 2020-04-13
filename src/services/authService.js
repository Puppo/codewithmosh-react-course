import jwtDecode from "jwt-decode";
import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/auth`;
const tokenKey = "token";

httpService.setJwt(getJwt());

async function login(email, password) {
  const { data: jwt } = await httpService.post(apiEndpoint, {
    email,
    password,
  });
  loginWithJwt(jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    return jwtDecode(getJwt());
  } catch (ex) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
