import { useState, useCallback, type ChangeEvent } from "react";
import { uploadImageForAnalysis } from "../api/analysisApi";
import ColorDisplay from "../components/ColorDisplay";
import Loader from "../components/Loader";
import type { AnalysisResult } from "../types/analysis";

const ImageAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setAnalysisResult(null);
      setError(null);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!selectedFile) {
      setError("Por favor, selecciona una imagen primero.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await uploadImageForAnalysis(selectedFile);
      setAnalysisResult(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  const imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-xl text-gray-100 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">
        Analizar por Subida de Imagen
      </h2>
      <p className="mb-6 text-gray-300">
        Sube una foto desde tu galería o toma una foto nueva para detectar sus
        colores dominantes.
      </p>

      <div className="mb-4">
        <label
          htmlFor="file-upload"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Seleccionar Imagen:
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-200
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-purple-600 file:text-white
            hover:file:bg-purple-700
            cursor-pointer"
        />
      </div>

      {imageUrl && (
        <div className="mb-6 flex justify-center">
          <img
            src={imageUrl}
            alt="Previsualización"
            className="max-w-xs max-h-48 object-contain rounded-md border border-gray-600"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedFile || isLoading}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-300 ease-in-out
          ${
            !selectedFile || isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            Analizando...
          </span>
        ) : (
          "Analizar Imagen"
        )}
      </button>

      <div className="mt-8 pt-4 border-t border-gray-700">
        {isLoading && <Loader />}

        {error && (
          <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-300 p-3 rounded-md mt-4 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {analysisResult && (
          <div className="mt-4 p-4 bg-gray-700 rounded-md">
            <h3 className="text-xl font-semibold mb-3 text-emerald-400">
              Resultado del Análisis:
            </h3>
            <p className="text-gray-300 mb-4">
              <span className="font-medium text-gray-200">Archivo:</span>{" "}
              {analysisResult.filename}
            </p>
            <ColorDisplay colors={analysisResult.dominant_colors} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageAnalysis;
