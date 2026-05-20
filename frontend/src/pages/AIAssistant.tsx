import ChatWindow from "../components/chat/ChatWindow";
import { useChat } from "../hooks/useChat";
import { Bot, Zap, Database, Brain } from "lucide-react";

const FEATURES = [
  { icon: Brain, label: "Claude claude-sonnet-4-6", desc: "Modelo de lenguaje avanzado de Anthropic" },
  { icon: Database, label: "Datos en tiempo real", desc: "Contexto dinámico de la base de datos" },
  { icon: Zap, label: "Respuestas rápidas", desc: "Optimizado para consultas ejecutivas" },
];

export default function AIAssistant() {
  const { messages, sendMessage, isLoading } = useChat();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
      <div className="lg:col-span-3 h-full">
        <ChatWindow messages={messages} onSend={sendMessage} isLoading={isLoading} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Bot size={18} className="text-blue-600" />
            <h3 className="font-semibold text-gray-900 text-sm">Asistente Comercial</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Consulta KPIs, ventas, inventario y métricas operativas en lenguaje natural. El asistente tiene acceso a
            los datos actualizados del negocio.
          </p>
        </div>

        {FEATURES.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1.5">
              <Icon size={15} className="text-blue-500" />
              <p className="text-sm font-medium text-gray-900">{label}</p>
            </div>
            <p className="text-xs text-gray-500">{desc}</p>
          </div>
        ))}

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-xs text-blue-700 leading-relaxed">
          <strong>Tip:</strong> Puedes preguntar sobre tendencias, comparar períodos, identificar productos críticos o
          pedir recomendaciones basadas en los datos.
        </div>
      </div>
    </div>
  );
}
