import { apiRequest } from "./apiRequest.js";

export async function signup(email, password, nickname, logoImage) {
  try {
    await apiRequest("/users/signup", "POST", {
      email,
      password,
      nickname,
      logoImage: logoImage.substring(0, 254),
    });
  } catch (error) {
    throw error;
  }
}
export async function login(email, password) {
  try {
    const response = await apiRequest("/users/login", "POST", {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getUser() {
  try {
    const response = await apiRequest("/users");

    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateUser(nickname, logoImage) {
  try {
    const response = await apiRequest("/users", "PATCH", {
      nickname,
      logoImage: logoImage.substring(0, 254),
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function updatePassword(password) {
  try {
    const response = await apiRequest("/users/password", "PATCH", {
      newPassword: password,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteUser() {
  try {
    await apiRequest("/users", "DELETE");
  } catch (error) {
    throw error;
  }
}
