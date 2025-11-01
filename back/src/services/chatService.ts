import OpenAI from "openai";
import { ChatMessage } from "../interfaces/chatMessage.types";
import "dotenv/config"; 



class ChatService {
  private chatHistory: ChatMessage[] = [];
  private readonly client: OpenAI;
  private readonly historyLimit: number = 20;

  constructor(private systemPrompt?: string) {
    if (systemPrompt) {
      this.chatHistory.push({ role: "system", content: systemPrompt });
    }
    this.client = new OpenAI({
      baseURL: process.env.BASE_URL_AI,
      apiKey: process.env.HF_TOKEN,
    });
  }

  async callModel(prompt: string): Promise<any> {
    this.chatHistory.push({ role: "user", content: prompt });

    const completion = await this.client.chat.completions.create({
      model: "openai/gpt-oss-120b:cerebras",
      messages: this.chatHistory,
    });

    const assistantResponse =
      completion.choices[0].message.content?.toString() || "Error no response";

    this.chatHistory.push({
      role: "assistant",
      content: assistantResponse,
    });

    this.setHistoryLimit(this.historyLimit);

    return completion;
  }

  getHistory(): ChatMessage[] {
    return [...this.chatHistory];
  }

  clearHistory(): void {
    this.chatHistory = [];
    if (this.systemPrompt) {
      this.chatHistory.push({ role: "system", content: this.systemPrompt });
    }
  }

  // Sets a maximum limit for the chat history to prevent excessive token usage.
  setHistoryLimit(limit: number): void {
    if (this.chatHistory.length > limit) {
      // Keep the system message and the most recent N messages
      const systemMessage = this.chatHistory.find(
        (msg) => msg.role === "system"
      );
      const recentMessages = this.chatHistory.slice(
        -limit + (systemMessage ? 1 : 0)
      );

      this.chatHistory = systemMessage
        ? [systemMessage, ...recentMessages]
        : recentMessages;
    }
  }
}

export default ChatService;
export const chatService = new ChatService(
  "Eres un asistente útil y creativo."
);
