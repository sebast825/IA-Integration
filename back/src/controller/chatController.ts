import { Request, Response } from "express";
import CallChatService from "../services/ChatService";


class ChatController{
   constructor(private callChatService : CallChatService){}
 generateText = async(req: Request, res: Response): Promise<void> =>{
   try {
    const message = await this.callChatService.callModel();
    res.json({
      status: "OK",
      message,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "ERROR", error: "Falló la IA" });
  }
}

 } 

export default ChatController;