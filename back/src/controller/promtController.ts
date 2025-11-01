import { Request, Response } from "express";
import PromptService from "../services/promtService";

class PromptController {
  constructor(private promptService: PromptService) {}


  generateText = async (req: Request, res: Response): Promise<void> => {

    const prompt: string =
      req.body && typeof req.body.message === "string" ? req.body.message : "";

    if (prompt.trim() == "") {
      res.status(400).json({ status: "ERROR", error: "No message submited" });
    }
    try {
      const responseMessage = await this.promptService.sendPrompt(prompt);
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

export default PromptController;
