import { Request, Response } from "express";
import ChatService from "../services/ChatService";
import "dotenv/config"; // 👈 forma corta y moderna

class ChatController {
  constructor(private chatService: ChatService) {}


  generateText = async (req: Request, res: Response): Promise<void> => {

    const prompt: string =
      req.body && typeof req.body.message === "string" ? req.body.message : "";

    if (prompt.trim() == "") {
      res.status(400).json({ status: "ERROR", error: "No message submited" });
    }
    try {
      const responseMessage = await this.chatService.callModel(prompt);
      res.json({
        status: "OK",
        responseMessage,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "ERROR", error: "IA Failed" });
    }
  };
}

export default ChatController;
