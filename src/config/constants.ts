const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_URL = API_BASE_URL;

export const UPLOAD_API_URL = `${API_BASE_URL}/api/v1/analysis/upload`;

// Cambia http:// por ws://
// export const REALTIME_WS_URL = `ws://localhost:8000/api/v1/analysis/realtime`;
export const REALTIME_WS_URL =
  API_BASE_URL.replace(/^http/, "ws") + "/api/v1/analysis/realtime";
