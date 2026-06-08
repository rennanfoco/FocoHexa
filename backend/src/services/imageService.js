const { OpenAI } = require("openai");

// Modelo configuravel via .env (padrao: gpt-5-image-mini ~$0.20/img)
const IMAGE_MODEL = process.env.IMAGE_MODEL || "openai/gpt-5-image-mini";

// Provider preferido: "Google AI Studio" (barato) ou "Google Vertex AI" (enterprise)
// Deixe vazio para o OpenRouter escolher automaticamente
const PROVIDER_ORDER = process.env.PROVIDER_ORDER
  ? process.env.PROVIDER_ORDER.split(",").map((p) => p.trim())
  : ["Google AI Studio"];

class ImageService {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": "https://focohexa.com",
        "X-Title": "FocoHexa",
      },
    });
    console.log(`Modelo de imagem: ${IMAGE_MODEL}`);
  }

  async generateImage(prompt, userName, userPhoto, backgroundBuffer) {
    console.log(`Gerando figurinha para ${userName} com ${IMAGE_MODEL}...`);

    const userPhotoBase64 = userPhoto.buffer.toString("base64");
    const backgroundBase64 = backgroundBuffer.toString("base64");
    const userMime = userPhoto.mimetype || "image/jpeg";

    const response = await this.client.chat.completions.create({
      model: IMAGE_MODEL,
      modalities: ["image", "text"],
      // Força o provider preferido no OpenRouter (evita roteamento para Vertex AI mais caro)
      provider: {
        order: PROVIDER_ORDER,
        allow_fallbacks: true, // usa Vertex como fallback se AI Studio estiver fora
      },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: `data:image/png;base64,${backgroundBase64}` },
            },
            {
              type: "image_url",
              image_url: { url: `data:${userMime};base64,${userPhotoBase64}` },
            },
            { type: "text", text: prompt },
          ],
        },
      ],
    });

    const imageBuffer = this.extractImage(response);
    console.log(`Figurinha gerada! (${imageBuffer.length} bytes)`);
    return { buffer: imageBuffer, size: imageBuffer.length };
  }

  extractImage(response) {
    const message = response.choices?.[0]?.message;
    if (!message) throw new Error("Sem choices na resposta");

    // Formato 1: message.images[] (openai/gpt-5.4-image-2 e similares)
    if (Array.isArray(message.images) && message.images.length > 0) {
      const dataUrl = message.images[0]?.image_url?.url || "";
      if (dataUrl.startsWith("data:")) {
        return Buffer.from(dataUrl.split(",")[1], "base64");
      }
    }

    // Formato 2: message.content como array com bloco image_url
    const content = message.content;
    if (Array.isArray(content)) {
      const block = content.find((c) => c.type === "image_url");
      const dataUrl = block?.image_url?.url || "";
      if (dataUrl.startsWith("data:")) {
        return Buffer.from(dataUrl.split(",")[1], "base64");
      }
    }

    // Formato 3: content como data URL string
    if (typeof content === "string" && content.startsWith("data:")) {
      return Buffer.from(content.split(",")[1], "base64");
    }

    // Formato 4: content como base64 pura
    if (typeof content === "string" && content.length > 100) {
      return Buffer.from(content, "base64");
    }

    throw new Error("Nao foi possivel extrair a imagem da resposta");
  }
}

module.exports = ImageService;