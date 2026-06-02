import React, { useState } from "react";

export default function NameInput({ onSubmit }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) { setError("Digite seu nome"); return; }
    if (trimmed.length > 50) { setError("Maximo 50 caracteres"); return; }
    setError("");
    onSubmit(trimmed);
  };

  return (
    <div className="name-panel">
      <div className="name-intro">
        <h2>Seu Nome na Figurinha</h2>
        <p>Este nome aparecera em efeito metalico foil na sua figurinha</p>
      </div>

      <form onSubmit={handleSubmit} className="name-form">
        <div className="name-field">
          <label className="field-label">Nome</label>
          <div className="input-wrapper">
            <input
              type="text"
              className={`name-input ${error ? "has-error" : ""}`}
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              placeholder="Ex: Joao Silva"
              maxLength={50}
              autoFocus
            />
            <span className="char-count">{name.length}/50</span>
          </div>
          {error && <span className="field-error">{error}</span>}
        </div>

        {name.trim() && (
          <div className="name-preview">
            <span className="preview-label">Preview</span>
            <span className="preview-name">{name.trim()}</span>
          </div>
        )}

        <button type="submit" className="btn-primary ready">
          <span>Gerar Figurinha</span>
          <span className="btn-sparkle">✦</span>
        </button>
      </form>
    </div>
  );
}