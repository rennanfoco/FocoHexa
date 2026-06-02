require("./config/env");
const express = require("express");
const cors = require("cors");
const imageRoutes = require("./routes/imageRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use("/api", imageRoutes);
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use((req, res) => res.status(404).json({ error: "Rota nao encontrada" }));
app.use(errorHandler);

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});

// Timeout de 5 min para suportar chamadas longas ao OpenRouter
httpServer.setTimeout(300000);