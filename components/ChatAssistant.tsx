
import React, { useState } from 'react';
import { getChatResponse } from '../services/geminiService';

interface ChatProps {
  context: string;
  isOpenExternal?: boolean;
  onToggleExternal?: (open: boolean) => void;
}

const ChatAssistant: React.FC<ChatProps> = ({ context, isOpenExternal, onToggleExternal }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hola, soy tu asistente formativo experto. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Sincronizar estado externo si existe
  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalOpen;
  const setIsOpen = (val: boolean) => {
    if (onToggleExternal) onToggleExternal(val);
    else setInternalOpen(val);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const botResponse = await getChatResponse(userMsg, context);
    
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-brand-primary hover:scale-110 text-white p-4 rounded-full shadow-2xl transition-all animate-bounce-slow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-brand-darkCard rounded-[2rem] shadow-2xl w-[350px] sm:w-[400px] flex flex-col overflow-hidden border border-gray-100 dark:border-white/10 animate-fade-in-up">
          <div className="bg-brand-primary p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">🤖</div>
              <div>
                <h3 className="font-bold text-sm leading-none uppercase tracking-widest">Asistente Virtual</h3>
                <span className="text-[10px] opacity-70 font-medium">IA Especializada</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors">
              ✕
            </button>
          </div>
          
          <div className="h-80 overflow-y-auto p-6 bg-gray-50 dark:bg-brand-darkBg flex flex-col gap-4 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-brand-primary text-white self-end rounded-br-none' : 'bg-white dark:bg-brand-darkCard border border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200 self-start rounded-bl-none'}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="flex gap-1 self-start ml-2 p-3 bg-white dark:bg-brand-darkCard rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white dark:bg-brand-darkCard border-t dark:border-white/5 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pregunta sobre el ecosistema..."
              className="flex-grow px-5 py-3 bg-gray-50 dark:bg-brand-darkBg border border-gray-100 dark:border-white/5 rounded-2xl text-sm focus:outline-none focus:border-brand-primary dark:text-white transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-brand-primary hover:brightness-110 text-white w-12 h-12 flex items-center justify-center rounded-2xl disabled:opacity-50 transition-all shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
