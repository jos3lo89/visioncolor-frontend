// Respuesta esperada del endpoint POST /upload
export interface AnalysisResult {
  filename: string;
  dominant_colors: string[];
  message: string;
}

// Respuesta esperada del WebSocket
export interface RealtimeResponse {
  dominant_colors?: string[];
  error?: string;
}
