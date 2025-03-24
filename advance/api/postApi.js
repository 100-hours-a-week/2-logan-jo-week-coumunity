import { apiRequest } from "./apiRequest.js";

export async function getPostList() {
  try {
    const response = await apiRequest("/posts");

    return response;
  } catch (error) {
    throw error;
  }
}
export async function getPost(id) {
  try {
    const response = await apiRequest(`/posts/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
}
export async function createPost(title, content, image) {
  try {
    const response = await apiRequest("/posts", "POST", {
      title,
      content,
      image,
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function updatePost(id, title, content, image) {
  try {
    const response = await apiRequest(`/posts/${id}`, "PATCH", {
      title,
      content,
      image,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deletePost(id) {
  try {
    const response = await apiRequest(`/posts/${id}`, "DELETE");

    return response;
  } catch (error) {
    throw error;
  }
}
