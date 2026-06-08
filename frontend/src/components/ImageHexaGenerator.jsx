import React, { useState } from "react";
import { useImageGenerator } from "../hooks/useImageGenerator";
import ImageUpload from "./ImageUpload";
import NameInput from "./NameInput";
import LoadingState from "./LoadingState";
import ImagePreview from "./ImagePreview";
import "../styles/generator.css";

export default function ImageHexaGenerator() {
  const [step, setStep] = useState("upload");
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const { generateImage, error, generatedImage } = useImageGenerator();

  const handleImageSelect = (selectedImage) => {
    setImage(selectedImage);
    setStep("name");
  };

  const handleNameSubmit = async (name) => {
    setUserName(name);
    setStep("loading");
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("nome", name);
      await generateImage(formData);
      setStep("preview");
    } catch (err) {
      console.error("Erro:", err);
      setStep("name");
    }
  };

  const handleReset = () => {
    setStep("upload");
    setImage(null);
    setUserName("");
  };

  const steps = ["upload", "name", "loading", "preview"];
  const stepIndex = steps.indexOf(step);

  return (
    <div className="generator-container">
      <div className="generator-header">
        <div className="header-logo">
          <span className="logo-foco">FOCO</span>
          <span className="logo-hexa">HEXA</span>
        </div>
        <h1>Seu Avatar Personalizado</h1>
        <p>Crie sua figurinha de colecao estilo Copa do Mundo</p>
      </div>

      <div className="step-indicator">
        {["Foto", "Nome", "Gerando", "Pronto"].map((label, i) => (
          <React.Fragment key={label}>
            <div
              className={`step-dot ${i <= stepIndex ? "active" : ""} ${
                i < stepIndex ? "done" : ""
              }`}
            >
              <span className="step-num">{i < stepIndex ? "✓" : i + 1}</span>
              <span className="step-label">{label}</span>
            </div>
            {i < 3 && (
              <div className={`step-line ${i < stepIndex ? "active" : ""}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="step-content">
        {step === "upload" && (
          <ImageUpload onImageSelected={handleImageSelect} />
        )}
        {step === "name" && <NameInput onSubmit={handleNameSubmit} />}
        {step === "loading" && <LoadingState userName={userName} />}
        {step === "preview" && generatedImage && (
          <ImagePreview
            image={generatedImage}
            userName={userName}
            onReset={handleReset}
          />
        )}
        {error && step !== "loading" && (
          <div className="error-message">
            <span className="error-icon">⚠</span>
            <span>{error}</span>
            <button className="btn-retry" onClick={handleReset}>
              Tentar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}