import { BASE_URL } from "../config";

export const profileEndpoints = {
  getProfiles: () => `${BASE_URL}profiles-details`,

  editProfile: (id) => `${BASE_URL}edit-profile/${id}`,

  registerProfile: () => `${BASE_URL}profiles`,

  getProfileImage: (id) => `${BASE_URL}profile-image/${id}`
};
