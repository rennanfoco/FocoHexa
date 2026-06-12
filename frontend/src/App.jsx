import React from 'react';
import './styles/generator.css';
import './styles/encerramento.css';

const FIGURINHAS_GERADAS = 'XXX';

export default function App() {
  return (
    <div className="encerramento-page">
      <div className="encerramento-card">
        <div className="enc-logo">
          <span className="logo-foco">FOCO</span>
          <span className="logo-hexa">HEXA</span>
        </div>

        <h1 className="enc-titulo">Campanha Encerrada</h1>

        <p className="enc-texto">
          Obrigado a todos que participaram da nossa campanha de figurinhas da Copa do Mundo!
          Foi incrível ver tantos torcedores transformados em craques.
        </p>

        <div className="enc-contador">
          <span className="enc-numero">+{FIGURINHAS_GERADAS}</span>
          <span className="enc-label">figurinhas geradas</span>
        </div>

        <div className="enc-coracao">❤</div>

        <p className="enc-rodape">Foco Aluguel de Carros</p>
      </div>
    </div>
  );
}
