import { apiEndpoint } from "../config.json";
import Http from "./httpService";
import jwtDecode from "jwt-decode";

const apiUrl = `${apiEndpoint}/auth`;

const tokenKey = "token";
Http.setJwt(getToken());

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export async function loginUser({ username: email, password }) {
  const { data: jwt } = await Http.post(apiUrl, { email, password });
  localStorage.setItem(tokenKey, jwt);
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function decode() {
  const jwt = localStorage.getItem(tokenKey);
  try {
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

const all = {
  loginUser,
  logout,
  decode,
  loginWithJwt,
  getToken,
};

export default all;
