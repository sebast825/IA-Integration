import { GoogleGenAI, Content } from "@google/genai";
import "dotenv/config";

class ChatService {
  private chatHistory: Content[] = [];
  private readonly client: GoogleGenAI;
  private readonly historyLimit: number;

  private systemPrompt: string | undefined;

  constructor() {
    this.systemPrompt = "Eres un asistente útil y creativo.";
    const limitString = process.env.HISTORY_LIMIT || "20";
    this.historyLimit = parseInt(limitString, 10);
    console.log(this.historyLimit);
    this.client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }
  async callModel(prompt: string): Promise<string> {
    // 1. Add the user's message to the history
    this.chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    try {
      // 2. Execute the call, passing the entire history (including the new message)
      const response = await this.client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: this.chatHistory, // The conversation history
        config: {
          // The system context/role (not part of the history array)
          systemInstruction: this.systemPrompt,
        },
      });

      const assistantResponse = response.text || "Error no response";

      // 4. Add the assistant's response to the history
      this.chatHistory.push({
        role: "model", // Use 'model' role for the AI's response in Gemini
        parts: [{ text: assistantResponse }],
      });
      // 5. Apply the history limit (Sliding Window Memory)
      this.setHistoryLimit(this.historyLimit);

      return assistantResponse;
    } catch (error) {
      console.error("Error calling Gemini model:", error);

      return "Error calling Gemini model";
    }
  }

  // Sets a maximum limit for the chat history to prevent excessive token usage.
  setHistoryLimit(limit: number): void {
    if (this.chatHistory.length > limit) {
      const recentMessages = this.chatHistory.slice(-limit);
      this.chatHistory = recentMessages;
    }
  }

  //if we implement multiple chats will use it in the future
  clearHistory(): void {
    this.chatHistory = [];
  }
  logChatInfo() {
    console.log("--- Historial Detallado ---");
    this.chatHistory.forEach((message, index) => {
      // 1. Verify if there are parts (generally there is at least one)
      if (message.parts && message.parts.length > 0) {
        // 2. Access the first element of the 'parts' array

        const textContent = message.parts[0].text;

        console.log(`[${index}] ${message.role}: ${textContent}`);
      } else {
        console.log(
          `[${index}] ${message.role}: (Sin contenido de texto visible)`
        );
      }
    });
    console.log("---------------------------");
  }
}

export default ChatService;
export const chatService = new ChatService();
