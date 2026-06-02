import React, { useEffect, useState } from "react";

const MESSAGES = [
  "Analisando sua foto...",
  "Aplicando identidade visual FOCO...",
  "Vestindo a camisa do Brasil...",
  "Adicionando efeito foil metalico...",
  "Compondo a figurinha...",
  "Ajustando detalhes do rosto...",
  "Polindo o acabamento premium...",
  "Finalizando a figurinha...",
  "Quase pronto...",
];

export default function LoadingState({ userName }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 8000);
    return () => clearInterval(msgTimer);
  }, []);

  useEffect(() => {
    const ticker = setInterval(() => {
      setElapsed((s) => s + 1);
      setProgress((p) => {
        if (p >= 92) return p;
        const increment = p < 40 ? 1.2 : p < 70 ? 0.7 : p < 85 ? 0.35 : 0.15;
        return Math.min(p + increment, 92);
      });
    }, 500);
    return () => clearInterval(ticker);
  }, []);

  const remaining = Math.max(0, 120 - elapsed);
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const timeLabel = mins > 0
    ? `~${mins}m ${secs}s restantes`
    : remaining > 0
    ? `~${secs}s restantes`
    : "finalizando...";

  return (
    <div className="loading-panel">
      <div className="loading-sticker">
        <div className="sticker-spin">
          <div className="sticker-card">
            <div className="sticker-shine" />
            <div className="sticker-content">
              <div className="sticker-badge">FOCO</div>
              <div className="sticker-avatar-placeholder">
                <div className="avatar-pulse" />
              </div>
              <div className="sticker-name-placeholder">{userName}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="loading-text">
        <h2>Gerando sua figurinha...</h2>
        <p className="loading-message">{MESSAGES[msgIndex]}</p>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }}>
          <div className="progress-glow" />
        </div>
      </div>
      <div className="progress-info">
        <span className="progress-pct">{Math.round(progress)}%</span>
        <span className="progress-eta">{timeLabel}</span>
      </div>

      <div className="loading-balls">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="ball" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>

      <p className="loading-note">
        A IA esta processando — pode levar entre 1 e 3 minutos
      </p>
    </div>
  );
}