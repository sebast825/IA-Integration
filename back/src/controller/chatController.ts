import { Request, Response } from "express";
import CallChatService from "../services/ChatService";

class ChatController {
  constructor(private callChatService: CallChatService) {}


  generateText = async (req: Request, res: Response): Promise<void> => {

    const prompt: string =
      req.body && typeof req.body.message === "string" ? req.body.message : "";

    if (prompt.trim() == "") {
      res.status(400).json({ status: "ERROR", error: "No message submited" });
    }
    try {
      const responseMessage = await this.callChatService.callModel(prompt);
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
