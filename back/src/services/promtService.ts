import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

class PromptService {
  private readonly ai;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async sendPrompt(promt: string): Promise<any> {
    const systemInstruction = "Please respond in plain text only. Do not use bold, headers, tables, or Markdown lists. You are a helpful and creative assistant.";

    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemInstruction,
        temperature: 1,
      },
      contents: promt,
    });
    return response.text;
  }
}

export const promptService = new PromptService();
export default PromptService;
