import Http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = `${apiEndpoint}/users`;

export function registerUser({ username, password, name }) {
  return Http.post(apiUrl, {
    email: username,
    password,
    name,
  });
}
