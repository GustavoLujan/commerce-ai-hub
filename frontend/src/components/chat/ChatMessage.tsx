import { Bot, User } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "../../types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? "bg-blue-600" : "bg-slate-700"
        }`}
      >
        {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
      </div>

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-sm"
            : "bg-white text-gray-800 border border-gray-200 rounded-tl-sm shadow-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
