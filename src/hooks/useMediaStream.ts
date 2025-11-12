import { useState, useCallback, useRef } from "react";

export const useMediaStream = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startStream = useCallback(async () => {
    try {
      // Pedir permiso para la cámara de video
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Preferir cámara trasera
        },
        audio: false, // No necesitamos audio
      });
      setStream(stream);
      streamRef.current = stream;
      setError(null);
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      setError(
        "No se pudo acceder a la cámara. Asegúrate de dar permiso y que tu sitio esté en HTTPS (o localhost)."
      );
    }
  }, []);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      setStream(null);
      streamRef.current = null;
    }
  }, []);

  return { stream, error, startStream, stopStream };
};
