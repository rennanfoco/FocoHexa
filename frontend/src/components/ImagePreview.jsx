import React, { useState } from "react";

export default function ImagePreview({ image, userName, onReset }) {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = image.downloadUrl;
    a.download = image.fileName || `foco-${userName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = async () => {
    try {
      const blob = await fetch(image.imageUrl).then((r) => r.blob());
      const file = new File([blob], image.fileName, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `Figurinha FOCO de ${userName}` });
        return;
      }
    } catch {}
    await navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="preview-panel">
      <div className="preview-success">
        <span className="success-icon">✦</span>
        <h2>Figurinha criada!</h2>
        <p>A figurinha de <strong>{userName}</strong> esta pronta</p>
      </div>

      <div className="preview-card">
        <div className="preview-shine" />
        <img
          src={image.imageUrl}
          alt={`Figurinha de ${userName}`}
          className="preview-image"
        />
        <div className="preview-badge">
          <span>HD</span>
          <span>1024×1024</span>
        </div>
      </div>

      <div className="preview-meta">
        <span className="meta-item">✦ Qualidade HD</span>
        <span className="meta-sep">·</span>
        <span className="meta-item">Pronto para impressao</span>
        <span className="meta-sep">·</span>
      </div>

      <div className="preview-actions">
        <button className="btn-download" onClick={handleDownload}>
          <span className="btn-icon">↓</span>
          <span>Baixar Figurinha</span>
        </button>
        <button className="btn-share" onClick={handleShare}>
          <span className="btn-icon">{copied ? "✓" : "⬡"}</span>
          <span>{copied ? "Copiado!" : "Compartilhar"}</span>
        </button>
      </div>

      <button className="btn-reset" onClick={onReset}>
        Gerar Nova Figurinha
      </button>
    </div>
  );
}