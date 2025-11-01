import { useState } from "react";
import type { Message } from "../pages/chatWindow";
import { useGenerate } from "./useGenerate";

export const useSendMessage = () => {
 const { postPromt } = useGenerate();

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

   const sendMessage = async (prompt:string) => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    var rsta: string = (await postPromt(trimmed)) ?? "";
    const newMsg: Message = {
      id: String(Date.now()),
      role: "user",
      text: trimmed,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((m) => [...m, newMsg]);

    setIsSending(true);
    setTimeout(() => {
      const reply: Message = {
        id: String(Date.now() + 1),
        role: "assistant",
        text: rsta,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((m) => [...m, reply]);
      setIsSending(false);
    }, 650);
  };

  return{
      messages,isSending,sendMessage,
  }
}