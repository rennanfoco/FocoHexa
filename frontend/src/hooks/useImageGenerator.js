import { useState } from 'react';
import { api } from '../api/client';

export function useImageGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  const generateImage = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/gerar-imagem', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { imageBase64, fileName } = response.data.data;
      const dataUrl = `data:image/png;base64,${imageBase64}`;
      const image = { imageUrl: dataUrl, downloadUrl: dataUrl, fileName };
      setGeneratedImage(image);
      return image;
    } catch (err) {
      const msg = err.message || 'Erro ao gerar imagem';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generateImage, loading, error, generatedImage };
}