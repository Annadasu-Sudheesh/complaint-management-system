import axios from "axios";

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const apiBaseUrl =
  rawApiBaseUrl?.replace(/\/$/, "") || "http://localhost:8080";

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

export const getApiUrl = (path) => {
  if (!path) return apiBaseUrl;

  const normalizedPath = String(path).replace(/^\/+/, "");
  return `${apiBaseUrl}/${normalizedPath}`;
};
