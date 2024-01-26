import { BASE_URL } from "../config";

export const userEndpoints = {
  getUsers: () => `${BASE_URL}users-details`,

  deleteUser: (id) => `${BASE_URL}user/${id}`,

  registerUser: () => `${BASE_URL}users`,

  loginUser: () => `${BASE_URL}login-user`,
};
