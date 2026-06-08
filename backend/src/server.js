require("./config/env");
const express = require("express");
const cors = require("cors");
const imageRoutes = require("./routes/imageRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Aceita multiplas origins (local + Vercel)
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Permite requisicoes sem origin (Render healthcheck, etc)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS bloqueado: ${origin}`));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use("/api", imageRoutes);
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use((req, res) => res.status(404).json({ error: "Rota nao encontrada" }));
app.use(errorHandler);

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Origins permitidas: ${allowedOrigins.join(", ")}`);
});

httpServer.setTimeout(300000);