import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUpload({ onImageSelected }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const onDrop = useCallback((accepted, rejected) => {
    if (rejected.length > 0) {
      setError("Arquivo invalido. Use JPG ou PNG, maximo 10MB.");
      return;
    }
    if (accepted[0]) {
      setFile(accepted[0]);
      setError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const handleRemove = () => setFile(null);

  const handleContinue = () => {
    if (!file) { setError("Envie uma foto para continuar"); return; }
    onImageSelected(file);
  };

  return (
    <div className="upload-panel">
      <div className="upload-intro">
        <h2>Envie sua Foto</h2>
        <p>Uma foto com rosto visivel — vamos transformar em figurinha premium</p>
      </div>

      <div className="upload-slots">
        <div className="upload-slot">
          {file ? (
            <div className="slot-preview">
              <img src={URL.createObjectURL(file)} alt="Preview" />
              <div className="slot-overlay">
                <button className="btn-remove" onClick={handleRemove} title="Remover">
                  ✕
                </button>
              </div>
              <div className="slot-check">✓</div>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`slot-dropzone ${isDragActive ? "dragging" : ""}`}
            >
              <input {...getInputProps()} />
              <div className="slot-icon">
                <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M20 8v16M12 16l8-8 8 8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 30h28"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </div>
              <p className="slot-text">
                {isDragActive ? "Solte aqui" : "Arraste ou clique para enviar"}
              </p>
              <span className="slot-hint">JPG / PNG • max 10MB</span>
            </div>
          )}
        </div>
      </div>

      {error && <p className="upload-error">{error}</p>}

      <button
        className={`btn-primary ${file ? "ready" : "disabled"}`}
        onClick={handleContinue}
        disabled={!file}
      >
        <span>Continuar</span>
        <span className="btn-arrow">→</span>
      </button>

      <p className="upload-tip">
        Dica: use fotos com boa iluminacao e rosto visivel para melhor resultado
      </p>
    </div>
  );
}