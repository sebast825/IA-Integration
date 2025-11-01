import OpenAI from "openai";
import "dotenv/config"; 

class PromptService {
     private readonly client: OpenAI;
     constructor() {
       this.client = new OpenAI({
         baseURL: process.env.BASE_URL_AI,
         apiKey: process.env.HF_TOKEN,
       });
     }
   
     async sendPrompt(promt : string): Promise<any> {
      const plainPrompt = `${promt}\n\nPor favor, responde solo en texto plano. No uses negritas, encabezados, tablas ni listas Markdown.`;

       const completion = await this.client.chat.completions.create({
         model: "openai/gpt-oss-120b:cerebras",
         messages: [
           { role: "user", content: plainPrompt },
         ],
       });
       var rsta = completion.choices[0].message.content?.toString() || "nope";
       return rsta;
     }
}

export const promptService = new PromptService();
export default PromptService;