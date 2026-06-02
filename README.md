# Foco Hexa

Gerador de figurinhas personalizadas estilo Copa do Mundo para a **Foco Aluguel de Carros**.

O usuario envia uma foto, digita seu nome, e a IA gera uma figurinha premium com identidade visual FOCO — camisa da selecao brasileira, fundo com as cores da marca e acabamento holografico foil.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| IA | OpenRouter API (modelo configuravel) |
| Upload | Multer (memoria, sem armazenamento) |
| Estilo | CSS puro com glassmorphism |

---

## Pre-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- Conta no [OpenRouter](https://openrouter.ai/) com creditos
- Chave de API do OpenRouter

---

## Instalacao

### 1. Clone o repositorio

```bash
git clone https://github.com/seu-usuario/foco-hexa.git
cd foco-hexa
```

### 2. Instale as dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure as variaveis de ambiente

```bash
cd backend
cp .env.example .env
```

Edite o arquivo `backend/.env` e adicione sua chave:

```env
OPENROUTER_API_KEY=sk-or-sua-chave-aqui
```

### 4. Adicione o template da figurinha

Coloque o arquivo `FocoFigurinha.png` em:

```
backend/src/assets/FocoFigurinha.png
```

> Este arquivo nao esta no repositorio pois e um asset proprietario da marca FOCO.

---

## Rodando localmente

Abra dois terminais:

```bash
# Terminal 1 — Backend (porta 3000)
cd backend
npm run dev

# Terminal 2 — Frontend (porta 5173)
cd frontend
npm run dev
```

Acesse: **http://localhost:5173**

---

## Variaveis de ambiente

| Variavel | Descricao | Padrao |
|---|---|---|
| `OPENROUTER_API_KEY` | Chave de API do OpenRouter | — |
| `IMAGE_MODEL` | Modelo de geracao de imagem | `openai/gpt-5-image-mini` |
| `PORT` | Porta do backend | `3000` |
| `FRONTEND_URL` | URL do frontend (CORS) | `http://localhost:5173` |

### Modelos disponiveis

| Modelo | Custo estimado/img | Observacao |
|---|---|---|
| `openai/gpt-5-image-mini` | ~$0.15–0.25 | Recomendado |
| `google/gemini-2.5-flash-image` | ~$0.05–0.10 | Nano Banana |
| `google/gemini-3.1-flash-image-preview` | ~$0.05–0.10 | Nano Banana 2 |
| `openai/gpt-5.4-image-2` | ~$1.00 | Premium |

---

## Estrutura do projeto

```
foco-hexa/
├── backend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── FocoFigurinha.png     # Template da figurinha (nao versionado)
│   │   ├── config/
│   │   │   └── env.js                # Validacao de variaveis de ambiente
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   └── imageRoutes.js        # POST /api/gerar-imagem
│   │   ├── services/
│   │   │   ├── imageService.js       # Integracao com OpenRouter
│   │   │   └── promptService.js      # Prompt de geracao
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── site.png                  # Background do site
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js             # Axios configurado
│   │   ├── components/
│   │   │   ├── ImageHexaGenerator.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── NameInput.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   └── ImagePreview.jsx
│   │   ├── hooks/
│   │   │   └── useImageGenerator.js
│   │   ├── styles/
│   │   │   └── generator.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Fluxo da aplicacao

```
Usuario envia foto + nome
        ↓
Frontend (React) monta FormData
        ↓
Backend recebe foto + le FocoFigurinha.png
        ↓
Envia ambas as imagens + prompt para OpenRouter
        ↓
Modelo gera a figurinha (1-3 min)
        ↓
Backend retorna base64
        ↓
Usuario baixa a figurinha
```

---

## Observacoes

- Nenhuma imagem e armazenada — tudo em memoria, download direto em base64
- O template `FocoFigurinha.png` e um asset proprietario e deve ser inserido manualmente
- Tempo de geracao: 1 a 3 minutos dependendo do modelo e carga do servidor