import getCookie from "../util/cookie.js";

export async function apiRequest(endpoint, method = "GET", data = null) {
  const baseUrl = "http://localhost:8080";
  const url = `${baseUrl}${endpoint}`;
  const token = getCookie("accessToken");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData.message || "API 요청 실패");
    }

    return await response.json().catch(() => null);
  } catch (error) {
    console.error("API 요청 오류:", error.message);
    throw error;
  }
}
