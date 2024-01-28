import { BASE_URL } from "../config";

export const projectEndpoints = {
  getProjects: () => `${BASE_URL}projects-details`,

  getProject: (id) => `${BASE_URL}projects-details/${id}`,

  deleteProject: (id, username) =>
    `${BASE_URL}delete-project/${id}/${username}`,

  postProject: () => `${BASE_URL}project`,

  getProjectImage: (id) => `${BASE_URL}project-image/${id}`
};
