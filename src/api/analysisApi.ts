import { UPLOAD_API_URL } from "../config/constants";
import type { AnalysisResult } from "../types/analysis";

/**
 * Sube una imagen al backend para su análisis.
 * @param file El archivo de imagen a subir
 * @returns La promesa con el resultado del análisis
 */
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
