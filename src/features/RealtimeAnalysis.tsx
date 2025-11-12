import { useState, useRef, useEffect, useCallback } from "react";
import { useMediaStream } from "../hooks/useMediaStream";
import type { RealtimeResponse } from "../types/analysis";
import { REALTIME_WS_URL } from "../config/constants";
import ColorDisplay from "../components/ColorDisplay";

const RealtimeAnalysis = () => {
  const {
    stream,
    error: streamError,
    startStream,
    stopStream,
  } = useMediaStream();
  const [dominantColors, setDominantColors] = useState<string[]>([]);
  const [wsError, setWsError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webSocketRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const sendFrame = useCallback(() => {
    if (
      !videoRef.current ||
      !canvasRef.current ||
      !webSocketRef.current ||
      webSocketRef.current.readyState !== WebSocket.OPEN ||
      videoRef.current.videoHeight === 0
    ) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    const w = video.videoWidth;
    const h = video.videoHeight;
    canvas.width = w / 2;
    canvas.height = h / 2;
    context.drawImage(video, 0, 0, w / 2, h / 2);

    canvas.toBlob(
      (blob) => {
        if (blob && webSocketRef.current?.readyState === WebSocket.OPEN) {
          webSocketRef.current.send(blob);
        }
      },
      "image/jpeg",
      0.5
    );
  }, []);

  const handleStart = async () => {
    setIsLoading(true);
    setWsError(null);
    setDominantColors([]);

    await startStream();

    webSocketRef.current = new WebSocket(REALTIME_WS_URL);

    webSocketRef.current.onopen = () => {
      console.log("WebSocket conectado.");
      setIsLoading(false);
      setIsStreaming(true);
      intervalRef.current = window.setInterval(sendFrame, 500);
    };

    webSocketRef.current.onmessage = (event) => {
      const data: RealtimeResponse = JSON.parse(event.data);
      if (data.dominant_colors) {
        setDominantColors(data.dominant_colors);
      } else if (data.error) {
        console.warn("Error desde el servidor WS:", data.error);
      }
    };

    webSocketRef.current.onerror = () => {
      console.error("Error de WebSocket.");
      setWsError("Error en la conexión de tiempo real. Intenta de nuevo.");
      setIsLoading(false);
      setIsStreaming(false);
    };

    webSocketRef.current.onclose = () => {
      console.log("WebSocket desconectado.");
      setIsLoading(false);
      setIsStreaming(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }
    stopStream();
    setIsStreaming(false);
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      handleStop();
    };
  }, []);

  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-xl text-gray-100 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-teal-400">
        Análisis en Tiempo Real
      </h2>
      <p className="mb-6 text-gray-300">
        Apunta tu cámara y detecta los colores dominantes en vivo.
      </p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleStart}
          disabled={isStreaming || isLoading}
          className={`w-full py-2.5 px-4 rounded-md text-white font-semibold transition duration-300 ease-in-out flex items-center justify-center
            ${
              isStreaming || isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
            }`}
        >
          {isLoading ? "Conectando..." : "Iniciar Cámara"}
        </button>

        <button
          onClick={handleStop}
          disabled={!isStreaming && !isLoading}
          className={`w-full py-2.5 px-4 rounded-md text-white font-semibold transition duration-300 ease-in-out
            ${
              !isStreaming && !isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
            }`}
        >
          Detener Cámara
        </button>
      </div>

      {(streamError || wsError) && (
        <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-300 p-3 rounded-md mb-4 text-sm">
          <strong>Error:</strong> {streamError || wsError}
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-8 pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400 mb-4">
          {isStreaming ? "Analizando en vivo..." : "La cámara está apagada."}
        </p>

        <div className="relative w-full max-w-2xl mx-auto aspect-video bg-gray-900 rounded-md overflow-hidden border-2 border-gray-700">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {isStreaming && (
        <div className="mt-4">
          <ColorDisplay colors={dominantColors} />
        </div>
      )}
    </section>
  );
};

export default RealtimeAnalysis;
