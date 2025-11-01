import { useState } from "react";
import { useGenerateSinglePrompt } from "./useGenerateSinglePrompt";
import type { MessageRoles } from "../types/messageRoles.types";
import type { Message } from "../types/message.types";

export const useSendMessage = () => {
  const { postPromt } = useGenerateSinglePrompt();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      text: "Hola — ¿en qué puedo ayudarte hoy?",
      time: "11:00",
    },
    {
      id: "2",
      role: "user",
      text: "Quiero crear una app con Vite + React + TS",
      time: "11:01",
    },
    {
      id: "3",
      role: "assistant",
      text: "Perfecto. Te dejo los pasos básicos cuando quieras.",
      time: "11:02",
    },
  ]);
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async (prompt: string) => {
    const trimmedPromt = prompt.trim();
    handleUserMessage(trimmedPromt);
    handleAiCallAndResponse(trimmedPromt);
  };

  const handleUserMessage = (text: string) => {
    if (!text) return;

    var newMsg: Message = newMessage(text, "user");
    setMessages((m) => [...m, newMsg]);
  };
  const handleAiCallAndResponse = async (text: string) => {
    var rsta: string = await postPromt(text);
    setIsSending(true);

    setTimeout(() => {
      var reply: Message = newMessage(rsta, "assistant");
      setMessages((m) => [...m, reply]);
      setIsSending(false);
    }, 650);
  };

  const newMessage = (text: string, role: MessageRoles): Message => {
    const message: Message = {
      id: String(Date.now() + 1),
      role: role,
      text: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    return message;
  };
  return {
    messages,
    isSending,
    sendMessage,
  };
};
