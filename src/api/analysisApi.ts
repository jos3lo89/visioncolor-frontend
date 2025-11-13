import { API_URL, UPLOAD_API_URL } from "../config/constants";
import type { AnalysisResult, HistoryApiResponse } from "../types/analysis";

export const uploadImageForAnalysis = async (
  file: File
): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(UPLOAD_API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Error al subir la imagen");
  }

  return response.json();
};

const PAGE_SIZE = 6;

export const getHistory = async (page: number): Promise<HistoryApiResponse> => {
  const url = `${API_URL}/api/v1/analysis/history?page=${page}&page_size=${PAGE_SIZE}`;

  try {
    const response = await fetch(url);

    const wadafa = await response.clone().text();
    console.log("wadafafafafa ->", wadafa);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error al cargar el historial");
    }

    const data: HistoryApiResponse = await response.json();
    return data;
  } catch (err) {
    console.error("Error en getHistory:", err);
    throw new Error(
      "No se pudo conectar con el servidor para obtener el historial."
    );
  }
};
