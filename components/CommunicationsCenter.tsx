
import React from 'react';
import MosaicModal from './mosaic/MosaicModal';
import MosaicButton from './mosaic/MosaicButton';

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
      case 'oficial': return 'bg-mosaic-cyan/10 text-mosaic-cyan';
      case 'modelo': return 'bg-mosaic-black-500/10 text-mosaic-black-400';
      case 'producto': return 'bg-mosaic-green/10 text-mosaic-green';
      case 'evento': return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <MosaicModal
      isOpen={isOpen}
      onClose={onClose}
      title="Centro de comunicaciones"
      subtitle="Notificaciones y actualizaciones"
      align="right"
    >
      <div className="p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-5 border transition-colors ${
              msg.isNew
                ? 'bg-mosaic-cyan/5 border-mosaic-cyan/30'
                : 'bg-mosaic-white-100 border-mosaic-white-300'
            }`}
          >
            <div className="flex justify-between items-start mb-3 gap-2">
              <span className={`px-2 py-1 mosaic-label text-[9px] ${getTypeStyles(msg.type)}`}>
                {msg.type}
              </span>
              <span className="mosaic-label text-mosaic-black-300 text-[9px] shrink-0">{msg.date}</span>
            </div>
            <h3 className="mosaic-body text-sm text-mosaic-black-500 mb-2">
              {msg.title}
              {msg.isNew && <span className="ml-2 w-2 h-2 bg-mosaic-cyan rounded-full inline-block animate-pulse" />}
            </h3>
            <p className="mosaic-body text-xs">{msg.content}</p>
            <button type="button" className="mosaic-label text-mosaic-cyan mt-3 hover:underline">
              Leer más →
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-mosaic-white-300">
        <MosaicButton variant="secondary">Ver historial completo</MosaicButton>
      </div>
    </MosaicModal>
  );
};

export default CommunicationsCenter;
