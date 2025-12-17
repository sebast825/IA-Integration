import { useState } from "react";
import type { MessageRoles } from "../types/messageRoles.types";
import type { Message } from "../types/message.types";

export const useSendMessage = (
  postPromtFn: (prompt: string) => Promise<string>
) => {
  const [messages, setMessages] = useState<Message[]>([
   
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
    setIsSending(true);
    var rsta: string = await postPromtFn(text);

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
