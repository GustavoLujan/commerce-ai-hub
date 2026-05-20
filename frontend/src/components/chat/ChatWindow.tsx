import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import type { ChatMessage as ChatMessageType } from "../../types";
import { Loader2 } from "lucide-react";

interface ChatWindowProps {
  messages: ChatMessageType[];
  onSend: (message: string) => void;
  isLoading: boolean;
}

const SUGGESTED = [
  "¿Cuál fue el producto más vendido esta semana?",
  "¿Cómo van las ventas vs la semana anterior?",
  "¿Qué regiones tienen mejor desempeño?",
  "¿Hay alertas de stock crítico?",
];

export default function ChatWindow({ messages, onSend, isLoading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
              <Loader2 size={14} className="text-white animate-spin" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length === 1 && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {SUGGESTED.map((q) => (
            <button
              key={q}
              onClick={() => onSend(q)}
              className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <ChatInput onSend={onSend} disabled={isLoading} />
    </div>
  );
}
