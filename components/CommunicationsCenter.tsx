
import React from 'react';

interface Message {
  id: string;
  type: 'oficial' | 'modelo' | 'producto' | 'evento';
  title: string;
  date: string;
  content: string;
  isNew?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CommunicationsCenter: React.FC<Props> = ({ isOpen, onClose }) => {
  const messages: Message[] = [
    {
      id: '1',
      type: 'evento',
      title: 'Webinar: Estrategias NextGen 2025',
      date: 'Hoy, 18:00h',
      content: 'Únete a nuestra sesión en vivo sobre las nuevas convocatorias de fondos europeos para el primer trimestre.',
      isNew: true
    },
    {
      id: '2',
      type: 'modelo',
      title: 'Actualización en tabla de comisiones',
      date: '15 Ene 2025',
      content: 'Se ha incrementado el bonus por volumen en el nivel Colaborador. Revisa los detalles en tu panel económico.'
    },
    {
      id: '3',
      type: 'producto',
      title: 'Nueva funcionalidad: Buscador IA Pro',
      date: '12 Ene 2025',
      content: 'Ya está disponible el nuevo motor de búsqueda semántica para identificar subvenciones por descripción de proyecto.'
    },
    {
      id: '4',
      type: 'oficial',
      title: 'Cambios en el Convenio de Colaboración',
      date: '10 Ene 2025',
      content: 'Hemos simplificado las cláusulas de confidencialidad para agilizar la firma digital.'
    }
  ];

  const getTypeStyles = (type: Message['type']) => {
    switch (type) {
      case 'oficial': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'modelo': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'producto': return 'bg-brand-secondary/20 text-brand-secondary dark:bg-brand-secondary/10';
      case 'evento': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white dark:bg-brand-darkCard h-full shadow-2xl animate-fade-in-right flex flex-col border-l border-gray-100 dark:border-white/5">
        <div className="p-8 border-b dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-brand-darkBg/50">
          <div>
            <h2 className="text-xl font-black text-brand-dark dark:text-white uppercase tracking-tighter">Centro de Comunicaciones</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Notificaciones y Actualizaciones</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`p-6 rounded-[2rem] border transition-all hover:scale-[1.02] cursor-pointer ${msg.isNew ? 'bg-brand-primary/5 border-brand-primary/20 shadow-lg shadow-brand-primary/5' : 'bg-white dark:bg-brand-darkBg border-gray-100 dark:border-white/5 shadow-sm'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${getTypeStyles(msg.type)}`}>
                  {msg.type}
                </span>
                <span className="text-[9px] font-bold text-gray-400">{msg.date}</span>
              </div>
              <h3 className="font-bold text-brand-dark dark:text-white mb-2 leading-tight">
                {msg.title}
                {msg.isNew && <span className="ml-2 w-2 h-2 bg-brand-primary rounded-full inline-block animate-pulse"></span>}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {msg.content}
              </p>
              <button className="mt-4 text-[9px] font-black text-brand-primary uppercase tracking-widest hover:underline">
                Leer más →
              </button>
            </div>
          ))}
        </div>

        <div className="p-8 border-t dark:border-white/5 bg-gray-50/50 dark:bg-brand-darkBg/50">
          <button className="w-full py-4 bg-brand-dark dark:bg-gray-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:brightness-125 transition-all">
            Ver historial completo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationsCenter;
