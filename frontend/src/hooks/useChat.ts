import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import client from "../api/client";
import type { ChatMessage } from "../types";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hola! Soy tu asistente comercial de Commerce AI Hub. Puedo ayudarte a analizar ventas, inventario, desempeño por región y responder consultas sobre los datos del negocio. ¿En qué puedo ayudarte?",
    },
  ]);

  const mutation = useMutation({
    mutationFn: async (message: string) => {
      const history = messages.filter((m) => m.role !== "assistant" || messages.indexOf(m) > 0);
      const res = await client.post("/chat", { message, history });
      return res.data.reply as string;
    },
    onSuccess: (reply, message) => {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: message },
        { role: "assistant", content: reply },
      ]);
    },
  });

  const sendMessage = (message: string) => {
    if (!message.trim() || mutation.isPending) return;
    mutation.mutate(message);
  };

  return {
    messages,
    sendMessage,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
