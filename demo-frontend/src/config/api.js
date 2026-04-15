import axios from "axios";

const rawApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BASE_URL;

const normalizeBaseUrl = (url) => {
  if (!url) return "http://localhost:8080";
  return String(url).trim().replace(/\/+$/, "");
};

export const apiBaseUrl = normalizeBaseUrl(rawApiBaseUrl);

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

export const getApiUrl = (path) => {
  if (!path) return apiBaseUrl;

  const normalizedPath = String(path).replace(/^\/+/, "");
  return `${apiBaseUrl}/${normalizedPath}`;
};
