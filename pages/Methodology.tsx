
import React from 'react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { useSettings } from '../context/SettingsContext';
import { 
  Users, 
  Monitor, 
  Megaphone, 
  BarChart3, 
  PlayCircle,
  Image as ImageIcon
} from 'lucide-react';

// Import assets to ensure they are bundled correctly
import vAdmin from '../video/Administrador.mp4';
import vColab from '../video/Colaborador.mp4';
import vPresc from '../video/Prescriptor.mp4';
import imgFase3 from '../img/Fase3.png';
import imgFase3_1 from '../img/Fase3.1.png';
import imgFase4 from '../img/Fase4.png';
import imgFase4_1 from '../img/Fase4.1.png';

const MethodologyPage = () => {
  const { theme } = useSettings();

  const phases = [
    {
      id: 1,
      title: "Fase 1 – Diagnóstico estratégico",
      desc: "En esta primera fase llevamos a cabo un análisis exhaustivo del ecosistema relacional actual, con el objetivo de comprender no solo quién forma parte de la red, sino cómo interactúa, qué valor aporta y qué potencial permanece sin activar.",
      longDesc: "Este diagnóstico combina una lectura estructural (mapa de contactos, tipologías, sectores) con una lectura dinámica (nivel de actividad, calidad de las relaciones, capacidad de generación de oportunidades). De este modo, identificamos tres grandes áreas:\n\n• Red activa: aquellos perfiles que ya están generando valor de forma tangible.\n• Red potencial: contactos existentes que aún no están activados, pero tienen capacidad de aportar.\n• Gaps de activación: espacios donde faltan perfiles clave o donde la relación no está bien estructurada.",
      items: [
        { 
          name: "Prescriptor", 
          desc: "Figura clave por su capacidad de influencia. No necesariamente ejecuta acciones directas, pero sí tiene un impacto relevante en la percepción y expansión del proyecto.",
          example: "Un directivo del sector que recomienda ejemploempresa.ai en una reunión con otros stakeholders, facilitando nuevas oportunidades de colaboración."
        },
        { 
          name: "Colaborador", 
          desc: "Participa de forma más directa, contribuyendo a iniciativas concretas. Su implicación puede ser puntual o recurrente, pero siempre está vinculada a la ejecución.",
          example: "Un experto que participa en el diseño o desarrollo de un proyecto específico."
        },
        { 
          name: "Delegado Mocota", 
          desc: "Rol más estratégico y territorial. Actúa como dinamizador de la red en un ámbito concreto (geográfico, sectorial o comunitario), siendo clave para escalar el modelo.",
          example: "Una persona responsable de activar la red ejemploempresa.ai en una ciudad, conectando actores locales y generando oportunidades."
        },
        { 
          name: "Oficina Mocota", 
          desc: "Núcleo de coordinación y soporte. Desde aquí se estructura la estrategia, se articulan las relaciones y se da coherencia al conjunto del sistema.",
          example: "Coordinación de iniciativas entre distintos colaboradores para evitar duplicidades y maximizar impacto."
        }
      ],
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 2,
      title: "Fase 2 – Adaptación tecnológica",
      desc: "Digitalizamos y estructuramos todo tu proceso de captación y validación con el objetivo de garantizar la calidad, trazabilidad y eficiencia en la incorporación de cada nuevo colaborador.",
      longDesc: "Implementamos una infraestructura tecnológica a medida que automatiza tanto el onboarding como la gestión operativa, reduciendo errores manuales y mejorando la experiencia del usuario.\n\nEsta solución incluye herramientas avanzadas como:\n\n• Cuestionarios de validación dinámicos e inteligentes, diseñados para filtrar perfiles de forma automatizada según criterios previamente definidos.\n• Dashboards de control en tiempo real, que permiten visualizar y analizar la actividad, el rendimiento y el progreso de cada colaborador.\n• Sistemas de simulación y modelado, que permiten prever escenarios, estados y flujos de trabajo antes de su implementación.\n\nEl resultado es un ecosistema digital sólido, escalable y preparado para crecer junto a tu red.",
      visualTitle: "Este es un ejemplo de todas las funcionalidades y roles que podemos tener en nuestra plataforma:",
      videoSources: [
        { title: 'Vídeo de Administrador', src: vAdmin },
        { title: 'Vídeo de Colaborador', src: vColab },
        { title: 'Vídeo de Prescriptor', src: vPresc }
      ],
      icon: <Monitor className="w-8 h-8" />,
      visual: true
    },
    {
      id: 3,
      title: "Fase 3 – Captación de Colaboradores",
      desc: "Desarrollamos e implementamos estrategias de marketing altamente segmentadas con el objetivo de atraer perfiles cualificados y alineados con tu propuesta de valor.",
      longDesc: "Nos enfocamos en hacer crecer tu red de forma sostenible, priorizando la calidad de los colaboradores sobre la cantidad.\n\nPara ello:\n\n• Diseñamos campañas de captación personalizadas basadas en los perfiles definidos en la Fase 1, asegurando que el mensaje llegue al público adecuado.\n• Utilizamos creatividades de alto impacto visual y comunicativo, capaces de transmitir de forma clara y directa los beneficios y oportunidades que ofrece tu red.\n• Optimizamos continuamente los anuncios mediante análisis de rendimiento, ajustando segmentaciones, mensajes y formatos para maximizar la conversión.\n\nDe esta manera, no solo atraemos volumen, sino que construimos una base sólida de colaboradores comprometidos y alineados con tus objetivos.",
      visualTitle: "Aquí podemos ver ejemplos de anuncios enfocados en la captación de nuevos colaboradores y nuevos clientes:",
      icon: <Megaphone className="w-8 h-8" />,
      images: [imgFase4, imgFase4_1]
    },
    {
      id: 4,
      title: "Fase 4 – Seguimiento y Optimización",
      desc: "Implementamos un sistema de análisis continuo que nos permite medir de forma precisa la efectividad de la red y optimizar cada uno de sus procesos. Esta fase es clave para asegurar el crecimiento sostenido y la mejora constante del rendimiento.",
      longDesc: "A través de herramientas de analítica avanzada:\n\n• Monitorizamos en tiempo real el comportamiento de los colaboradores, identificando patrones, cuellos de botella y oportunidades de mejora.\n• Evaluamos el rendimiento de cada etapa del flujo de trabajo para detectar ineficiencias y aplicar ajustes estratégicos.\n• Tomamos decisiones basadas en datos reales, lo que nos permite adaptar rápidamente las estrategias ante cambios del entorno o del mercado.\n\nEste enfoque dinámico garantiza que tu red no solo funcione correctamente, sino que evolucione de forma continua, alcanzando niveles cada vez más altos de eficiencia y rentabilidad.",
      visualTitle: "Aquí podemos ver ejemplos de anuncios que realizaríamos para tener un seguimiento de nuestros clientes, respaldándolos y acompañándolos en todo el proceso:",
      icon: <BarChart3 className="w-8 h-8" />,
      images: [imgFase3, imgFase3_1]
    }
  ];

  return (
    <div className={`min-h-screen pt-32 pb-20 bg-transparent`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            Nuestra Metodología
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>
            Un sistema probado para transformar redes comerciales pasivas en canales de venta activos y escalables.
          </p>
        </motion.div>

        <div className="space-y-12">
          {phases.map((phase, _idx) => {
            const hasVisualContent = phase.videoSources || phase.images;
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col w-full gap-8 items-stretch"
              >
                <div className={`${hasVisualContent ? 'flex-1' : 'w-full'} p-10 rounded-[3rem] border transition-all backdrop-blur-[2px] ${
                  theme === 'dark' 
                    ? 'bg-brand-dark-card/40 border-white/5' 
                    : 'bg-white/40 border-gray-100 shadow-xl shadow-gray-200/20'
                }`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                      {phase.icon}
                    </div>
                    <div>
                      <span className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? '!text-white' : 'text-brand-primary'}`}>Paso {phase.id}</span>
                      <h2 className="text-3xl font-black tracking-tight">{phase.title}</h2>
                    </div>
                  </div>
                  
                  <p className={`text-xl font-bold mb-6 leading-relaxed ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>
                    {phase.desc}
                  </p>

                  {phase.longDesc && (
                    <div className="mb-8 p-8 rounded-[2rem] bg-brand-primary/10 border border-brand-primary/20 shadow-lg">
                      <div className={`text-base font-medium prose prose-sm max-w-none dark:prose-invert leading-relaxed ${theme === 'dark' ? '!text-white' : 'text-gray-600'}`}>
                        <Markdown>{phase.longDesc}</Markdown>
                      </div>
                    </div>
                  )}

                  {phase.items ? (
                    <div className={`grid grid-cols-1 ${!hasVisualContent ? 'md:grid-cols-2' : ''} gap-4`}>
                      {phase.items.map((item, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${
                          theme === 'dark' ? 'bg-brand-dark-bg border-white/5' : 'bg-gray-50 border-gray-100'
                        }`}>
                          <h4 className={`text-xl font-black mb-2 ${theme === 'dark' ? '!text-white' : 'text-brand-primary'}`}>{item.name}</h4>
                          <p className={`text-sm mb-4 ${theme === 'dark' ? '!text-white' : 'text-gray-500'}`}>{item.desc}</p>
                          {item.example && (
                            <div className="pt-4 border-t border-gray-200 dark:border-white/5">
                              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${theme === 'dark' ? 'text-white' : 'text-brand-secondary'}`}>Ejemplo:</p>
                              <p className={`text-xs italic ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>{item.example}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : phase.content ? (
                    <div className={`p-6 rounded-2xl border border-dashed ${
                      theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <p className={`italic ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>{phase.content}</p>
                    </div>
                  ) : null}
                </div>

                {hasVisualContent && (
                  <div className="flex-1 flex flex-col gap-8 w-full mt-8">
                    {(phase as any).visualTitle && (
                      <div className="text-center mb-4">
                        <h3 className={`text-2xl md:text-3xl font-black tracking-tight max-w-4xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-brand-dark'}`}>
                          {(phase as any).visualTitle}
                        </h3>
                      </div>
                    )}
                    {phase.videoSources ? (
                      <div className={`w-full p-6 md:p-12 rounded-[3rem] ${
                        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                      } border shadow-inner flex flex-col items-center gap-10`}>
                        {phase.videoSources.map((video, vIdx) => (
                          <motion.div 
                            key={vIdx}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: vIdx * 0.1 }}
                            className="w-full max-w-4xl space-y-4"
                          >
                            <h3 className="text-lg font-black tracking-tight text-center">{video.title}</h3>
                            <div className="group relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 bg-black">
                              <video 
                                controls 
                                playsInline
                                preload="metadata"
                                crossOrigin="anonymous"
                                className="w-full h-full object-contain relative z-10 cursor-pointer"
                              >
                                <source src={video.src} type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                              </video>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : phase.images ? (
                      <div className={`w-full p-6 md:p-12 rounded-[3rem] ${
                        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                      } border shadow-inner flex flex-wrap justify-center items-center gap-10`}>
                        {phase.images.map((img, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-dark-card"
                          >
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-gray-50/50 dark:bg-black/20">
                              <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                              </div>
                              <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? '!text-white' : 'text-gray-400'}`}>Visualización {i + 1}</span>
                            </div>
                            <img 
                              src={img} 
                              alt={`Anuncio ${i + 1}`}
                              className="w-full h-auto block"
                              referrerPolicy="no-referrer"
                            />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className={`w-full h-full rounded-[3rem] overflow-hidden relative min-h-[300px] ${
                        theme === 'dark' ? 'bg-brand-dark-card' : 'bg-gray-200'
                      }`}>
                        {phase.visual ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/20 backdrop-blur-sm group cursor-pointer">
                            <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:scale-110 transition-transform" />
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <ImageIcon className="w-32 h-32" />
                          </div>
                        )}
                        <img 
                          src={`https://picsum.photos/seed/meth${phase.id}/800/600`} 
                          alt={phase.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 p-12 rounded-[4rem] bg-brand-primary text-white text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6">¿Listo para activar tu red?</h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Nuestra metodología se adapta a las necesidades específicas de tu sector y tipo de producto.
            </p>
            <button className="px-10 py-5 bg-white dark:bg-brand-dark-card text-brand-primary dark:text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl">
              Solicitar Auditoría de Red
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default MethodologyPage;
