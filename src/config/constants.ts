// La URL base de tu API de FastAPI
const API_BASE_URL = "http://localhost:8000";

// URL para el endpoint de subida (POST)
export const UPLOAD_API_URL = `${API_BASE_URL}/api/v1/analysis/upload`;

// URL para el endpoint de WebSocket (WS)
// Nota: Cambia http:// por ws://
export const REALTIME_WS_URL = `ws://localhost:8000/api/v1/analysis/realtime`;
