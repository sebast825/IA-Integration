import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config"; 

class PromptService {
  private readonly ai;

  constructor() {
    this.ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,

    });
  }

  async sendPrompt(promt: string): Promise<any> {
    const systemInstruction = `nPor favor, responde solo en texto plano. No uses negritas, encabezados, tablas ni listas Markdown.`;

    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemInstruction,
      },
      contents: promt,
    });
    return response.text;
  }
}

export const promptService = new PromptService();
export default PromptService;
