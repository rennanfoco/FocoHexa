const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const PromptService = require("../services/promptService");
const ImageService = require("../services/imageService");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Arquivo deve ser uma imagem (JPG ou PNG)"));
  },
});

const imageService = new ImageService();
const BACKGROUND_PATH = path.join(__dirname, "../assets/FocoFigurinha.png");

router.post("/gerar-imagem", upload.single("image"), async (req, res, next) => {
  try {
    const { nome } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Envie sua foto para continuar" });
    }

    if (!fs.existsSync(BACKGROUND_PATH)) {
      console.error("FocoFigurinha.png nao encontrado em:", BACKGROUND_PATH);
      return res.status(500).json({
        error: "Template da figurinha nao encontrado. Contate o suporte.",
      });
    }

    const nomeValidado = PromptService.validateName(nome);
    const { prompt } = PromptService.generatePrompt(nomeValidado);

    const userPhoto = { buffer: req.file.buffer, mimetype: req.file.mimetype };
    const backgroundBuffer = fs.readFileSync(BACKGROUND_PATH);

    const imagemGerada = await imageService.generateImage(
      prompt,
      nomeValidado,
      userPhoto,
      backgroundBuffer
    );

    res.json({
      success: true,
      data: {
        imageBase64: imagemGerada.buffer.toString("base64"),
        fileName: `foco-${nomeValidado}.png`,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;