
import React, { useState } from 'react';
import { getChatResponse } from '../services/geminiService';
import MosaicButton from './mosaic/MosaicButton';

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
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-mosaic-black-500 hover:bg-mosaic-cyan text-mosaic-white-100 p-4 shadow-lg transition-colors"
          aria-label="Abrir asistente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="bg-mosaic-white-100 border border-mosaic-white-300 shadow-2xl w-[min(100vw-2rem,400px)] flex flex-col overflow-hidden">
          <div className="bg-mosaic-black-500 p-5 flex justify-between items-center text-mosaic-white-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-mosaic-cyan/20 flex items-center justify-center text-lg">🤖</div>
              <div>
                <h3 className="mosaic-label text-mosaic-white-100">Asistente virtual</h3>
                <span className="mosaic-label text-mosaic-cyan text-[9px]">IA especializada</span>
              </div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center hover:text-mosaic-cyan transition-colors">
              ✕
            </button>
          </div>

          <div className="h-72 sm:h-80 overflow-y-auto p-4 bg-mosaic-white-200 flex flex-col gap-3 custom-scrollbar">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] p-3 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-mosaic-black-500 text-mosaic-white-100 self-end'
                    : 'bg-mosaic-white-100 border border-mosaic-white-300 text-mosaic-black-400 self-start'
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="flex gap-1 self-start p-3 bg-mosaic-white-100 border border-mosaic-white-300">
                <div className="w-1.5 h-1.5 bg-mosaic-cyan rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-mosaic-cyan rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-mosaic-cyan rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          <div className="p-3 bg-mosaic-white-100 border-t border-mosaic-white-300 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pregunta sobre el ecosistema..."
              className="app-input flex-grow"
            />
            <MosaicButton fullWidth={false} className="!w-12 !p-0 flex items-center justify-center" onClick={handleSend} disabled={loading || !input.trim()}>
              →
            </MosaicButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
