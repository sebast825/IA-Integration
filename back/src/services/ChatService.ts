import OpenAI from "openai";
import "dotenv/config"; // 👈 forma corta y moderna

class ChatService {
  private readonly client: OpenAI;
  constructor() {
    this.client = new OpenAI({
      baseURL: process.env.BASE_URL_AI,
      apiKey: process.env.HF_TOKEN,
    });
  }

  async callModel(promt : string): Promise<any> {
    const completion = await this.client.chat.completions.create({
      model: "openai/gpt-oss-120b:cerebras",
      messages: [
        { role: "user", content: promt },
      ],
    });

    console.log();
    var rsta = completion.choices[0].message.content?.toString() || "nope";
    //console.log("Respuesta: ", completion);
    return completion;
  }
}

export const chatService = new ChatService();
export default ChatService;
