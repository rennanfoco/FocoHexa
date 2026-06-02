const PROMPT_TEMPLATE = `Use the provided template image as the official layout and background (FOCO brand identity with geometric shapes in green, yellow, and red). The output is the retangular sticker card itself, filling the entire frame.

Extract the person from their photo and place the portrait centered on the card, chest-up framing, keeping the face realistic and recognizable with natural lighting. Replace clothing with the Brazil national football team jersey (yellow with green details, modern and realistic fabric). The card background comes entirely from the template — the person's original background is fully replaced. The portrait sits in front of all background elements; the geometric shapes and card design frame the person from behind without overlapping them.

Keep the original branded background intact. Maintain the FOCO logo at the bottom, clean and untouched.

Add the person's name "{USER_NAME}" above the "foco aluguel de carros" logo, centered. Text styling: metallic foil effect (chrome / holographic style), subtle reflections and shine, premium collectible sticker look.

Style: World Cup collectible sticker, premium metallic finish (foil / shiny card), high resolution, print ready, professional lighting and clean composition.`;

class PromptService {
  static generatePrompt(userName) {
    const prompt = PROMPT_TEMPLATE.replace(/{USER_NAME}/g, userName);
    return { prompt, characterCount: prompt.length };
  }

  static validateName(name) {
    if (!name || name.trim().length === 0) {
      throw new Error("Nome e obrigatorio");
    }
    if (name.length > 50) {
      throw new Error("Nome deve ter ate 50 caracteres");
    }
    return name.trim().replace(/[<>"'\/]/g, "");
  }
}

module.exports = PromptService;