import React, { useState, useEffect } from 'react';
import logo from '../img/logo.svg';
import { useSettings } from '../context/SettingsContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Target, 
  ShieldCheck, 
  MessageSquare, 
  ChevronDown,
  X,
  Play,
  Ghost,
  EyeOff
} from 'lucide-react';

const PipelineMockup = () => {
  return (
    <div className="bg-[#0F172A] p-8 space-y-6 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pipeline Activo</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-white tracking-tighter">+124%</span>
            <svg className="w-12 h-6 text-green-400" viewBox="0 0 50 20">
              <path 
                d="M2 15 C 10 15, 15 2, 25 10 C 35 18, 40 5, 48 5" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {[
          { icon: 'Te', name: 'TechCorp S.A.', val: '45.000€', tag: 'CIERRE', color: 'green', progress: 85 },
          { icon: 'Lo', name: 'Logistics Pro', val: '12.500€', tag: 'VALIDACIÓN', color: 'blue', progress: 40 },
          { icon: 'Gl', name: 'Global Retail', val: '89.000€', tag: 'PROPUESTA', color: 'red', progress: 20 },
        ].map((item, i) => (
          <div key={i} className="bg-white/10 p-5 rounded-[2rem] border border-white/10 flex items-center justify-between group hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm uppercase shadow-lg ${
                item.color === 'green' ? 'bg-green-400 text-brand-dark' : 
                item.color === 'blue' ? 'bg-blue-400 text-brand-dark' : 'bg-red-400 text-brand-dark'
              }`}>
                {item.icon}
              </div>
              <div>
                <h4 className="text-[15px] font-black text-white leading-tight tracking-tight">{item.name}</h4>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px] font-bold text-gray-300">{item.val}</span>
                  <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        item.color === 'green' ? 'bg-green-400' : 
                        item.color === 'blue' ? 'bg-blue-400' : 'bg-red-400'
                      }`} 
                      style={{ width: `${item.progress}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
            <span className={`text-[9px] font-black px-4 py-2 rounded-full ${
              item.color === 'green' ? 'bg-green-500/20 text-green-400' : 
              item.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : 
              'bg-red-500/20 text-red-400'
            } uppercase tracking-widest`}>
              {item.tag}
            </span>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="flex justify-around items-center mt-auto pt-8 border-t border-white/5">
        <div className="text-center">
          <p className="text-3xl font-black text-red-400">85%</p>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Activación</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-black text-blue-400">24h</p>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Respuesta</p>
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const { t, theme } = useSettings();
  const navigate = useNavigate();
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeSteps, setActiveSteps] = useState<number[]>([]);
  const [activeBenefit, setActiveBenefit] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCTA = () => {
    document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleStep = (step: number) => {
    setActiveSteps(prev => 
      prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]
    );
  };

  return (
    <div className="transition-colors duration-300 bg-transparent overflow-x-hidden">
      {/* Sticky CTA */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-20 left-0 w-full z-50 bg-white/80 dark:bg-brand-dark-bg/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 py-3 px-4 shadow-lg hidden md:block"
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="w-6 h-6" />
                <div className="flex items-center gap-2">
                  <span className="text-brand-primary font-black text-sm">Redes</span>
                  <span className="text-brand-secondary font-black text-sm">comerciales.ai</span>
                </div>
              </div>
              <button 
                onClick={scrollToCTA}
                className="bg-brand-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all shadow-md"
              >
                {t('hero.cta.primary')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-40 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 dark:opacity-10">
          <svg viewBox="0 0 1000 1000" className="w-full h-full">
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <circle cx="500" cy="500" r="400" fill="url(#grad1)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs mb-6 uppercase tracking-[0.2em]">
              {t('hero.tag')}
            </span>
            <h1 className={`text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-brand-dark'}`}>
              {t('hero.title')}
            </h1>
            <p className={`text-xl mb-10 max-w-xl leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
              {t('hero.subtitle')}
            </p>
            
            <div className="space-y-4 mb-10">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-brand-primary w-5 h-5 shrink-0" />
                  <span className={`font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-brand-dark'}`}>{t(`hero.bullet${i}`)}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={scrollToCTA}
                className="px-10 py-5 bg-brand-primary text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-brand-primary/30 flex items-center justify-center gap-2"
              >
                {t('hero.cta.primary')}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="px-10 py-5 bg-white dark:bg-brand-dark-card text-brand-dark dark:text-white border border-gray-200 dark:border-white/10 rounded-2xl font-black text-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                {t('nav.login')}
                <Play className="w-4 h-4 fill-current rotate-90" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-[#0F172A] p-4 rounded-[3rem] shadow-2xl border border-white/10 shadow-black/40">
              <div className="bg-[#0F172A] rounded-[2rem] overflow-hidden aspect-[4/5] flex flex-col justify-between relative h-[500px]">
                <PipelineMockup />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-secondary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. Problema Section */}
      <section className="py-32 bg-white/20 dark:bg-brand-darkBg/10 backdrop-blur-[1px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark dark:text-white mb-8 leading-tight">
              {t('problem.headline')}
            </h2>
            <p className="text-xl text-gray-500 dark:text-white leading-relaxed mb-8">
              {t('problem.copy')}
            </p>
            <p className="text-2xl font-black text-brand-primary">
              {t('problem.remate')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-50 dark:bg-brand-dark-card p-12 rounded-[3rem] border border-gray-100 dark:border-white/5">
              <div className="mb-10 flex items-center gap-4">
                <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                  <X className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark dark:text-white">{t('problem.passive.title')}</h3>
              </div>
              <div className="space-y-6 opacity-50 grayscale">
                <div className="flex gap-4 items-start bg-white dark:bg-brand-darkBg p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl shrink-0 flex items-center justify-center">
                    <Ghost className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-600 dark:text-white">{t('problem.passive.item1.title')}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-200 leading-tight">{t('problem.passive.item1.desc')}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start bg-white dark:bg-brand-darkBg p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl shrink-0 flex items-center justify-center">
                    <EyeOff className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-600 dark:text-white">{t('problem.passive.item2.title')}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-200 leading-tight">{t('problem.passive.item2.desc')}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-white dark:bg-brand-darkBg p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl shrink-0 flex items-center justify-center">
                    <Target className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-600 dark:text-white">{t('problem.passive.item3.title')}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-200 leading-tight">{t('problem.passive.item3.desc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-primary/5 p-12 rounded-[3rem] border border-brand-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl"></div>
              <div className="mb-10 flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark dark:text-white">{t('problem.active.title')}</h3>
              </div>
              <div className="space-y-6 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex gap-4 items-start bg-white dark:bg-brand-darkCard p-4 rounded-2xl shadow-xl shadow-brand-primary/5 border border-brand-primary/10"
                >
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl shrink-0 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-brand-dark dark:text-white">{t('problem.active.item1.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-200 leading-tight">{t('problem.active.item1.desc')}</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4 items-start bg-white dark:bg-brand-darkCard p-4 rounded-2xl shadow-xl shadow-brand-primary/5 border border-brand-primary/10"
                >
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl shrink-0 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-brand-dark dark:text-white">{t('problem.active.item2.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-200 leading-tight">{t('problem.active.item2.desc')}</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-4 items-start bg-white dark:bg-brand-darkCard p-4 rounded-2xl shadow-xl shadow-brand-primary/5 border border-brand-primary/10"
                >
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl shrink-0 flex items-center justify-center">
                    <Users className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-brand-dark dark:text-white">{t('problem.active.item3.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-200 leading-tight">{t('problem.active.item3.desc')}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solución Section */}
      <section className="py-32 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight max-w-4xl mx-auto">
            {t('solution.headline')}
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed mb-16">
            {t('solution.copy')}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h4 className="text-2xl font-bold mb-4 text-brand-primary">Estrategia</h4>
              <p className="text-sm text-white">Diseño del modelo de activación y escalabilidad.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h4 className="text-2xl font-bold mb-4 text-brand-primary">Tecnología</h4>
              <p className="text-sm text-white">Plataforma propia para tracking y gestión de red.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h4 className="text-2xl font-bold mb-4 text-brand-primary">Operación</h4>
              <p className="text-sm text-white">Gestión humana experta para asegurar el cierre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Metodología Section */}
      <section id="metodologia" className="py-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark dark:text-white mb-6">
              {t('methodology.headline')}
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 dark:bg-white/5 -translate-y-1/2"></div>
            
            <div className="grid lg:grid-cols-4 gap-12">
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i}
                  whileInView={{ y: [20, 0], opacity: [0, 1] }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => toggleStep(i)}
                  className="relative z-10 bg-white/40 dark:bg-brand-darkCard/40 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100/50 dark:border-white/5 text-center cursor-pointer hover:scale-[1.02] transition-all"
                >
                  <div className="w-16 h-16 bg-brand-primary text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-8 shadow-lg shadow-brand-primary/20">
                    {i}
                  </div>
                  <h3 className={`text-xl font-black mb-4 ${theme === 'dark' ? '!text-white' : 'text-brand-dark'}`}>
                    {t(`methodology.step${i}.title`)}
                  </h3>
                  <AnimatePresence>
                    {activeSteps.includes(i) && (
                      <motion.p 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={`text-sm leading-relaxed ${theme === 'dark' ? '!text-white font-bold' : 'text-gray-500'} overflow-hidden`}
                      >
                        {t(`methodology.step${i}.desc`)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Beneficios Section */}
      <section className="py-32 bg-gray-50/20 dark:bg-brand-darkCard/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark dark:text-white mb-6">
              {t('benefits.headline')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div 
                key={i} 
                layout
                onClick={() => setActiveBenefit(activeBenefit === i ? null : i)}
                className={`p-8 rounded-3xl shadow-sm border transition-all cursor-pointer flex flex-col gap-6 ${
                  activeBenefit === i 
                    ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20 border-transparent ring-4 ring-brand-primary/10' 
                    : 'bg-white dark:bg-brand-darkCard border-gray-100 dark:border-white/5 hover:shadow-xl'
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                    activeBenefit === i ? 'bg-white/20 text-white' : 'bg-brand-primary/10 text-brand-primary group-hover:scale-110'
                  }`}>
                    {i === 1 ? <TrendingUp /> : i === 2 ? <Zap /> : i === 3 ? <BarChart3 /> : i === 4 ? <Users /> : <ShieldCheck />}
                  </div>
                  <h3 className={`text-lg font-bold leading-tight ${activeBenefit === i ? 'text-white' : 'text-brand-dark dark:text-white'}`}>
                    {t(`benefits.item${i}.title`)}
                  </h3>
                </div>
                <AnimatePresence>
                  {activeBenefit === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/90 text-sm leading-relaxed font-medium">
                        {t(`benefits.item${i}.desc`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Diferenciación Section */}
      <section className="py-32 bg-white/20 dark:bg-brand-darkBg/10 backdrop-blur-[1px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark dark:text-white mb-6">
              {t('diff.headline')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[3rem] bg-gray-50 dark:bg-brand-dark-bg border border-gray-100 dark:border-white/5 opacity-60">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-8">
                <X className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-dark dark:text-white">{t('diff.agencies.title')}</h3>
              <p className="text-gray-500 dark:text-white">{t('diff.agencies.desc')}</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-gray-50 dark:bg-brand-dark-bg border border-gray-100 dark:border-white/5 opacity-60">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-8">
                <X className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-dark dark:text-white">{t('diff.saas.title')}</h3>
              <p className="text-gray-500 dark:text-white">{t('diff.saas.desc')}</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-brand-primary text-white shadow-2xl shadow-brand-primary/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl"></div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white mb-8">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('diff.us.title')}</h3>
              <p className="text-white/80">{t('diff.us.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Casos Section */}
      <section className="py-32 bg-gray-50/20 dark:bg-brand-darkCard/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark dark:text-white mb-6 max-w-4xl mx-auto">
              {t('cases.headline')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="text-center">
                <p className="text-6xl font-black text-brand-primary mb-4">{t(`cases.metric${i}.val`)}</p>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t(`cases.metric${i}.label`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Modelo Section */}
      <section className="py-32 bg-transparent">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-brand-dark dark:bg-brand-dark-card rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden border border-transparent dark:border-white/5">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] rounded-full"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-10">{t('model.headline')}</h2>
              <p className="text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
                {t('model.copy')}
              </p>
              <div className="flex items-center gap-4 text-2xl font-black text-brand-primary">
                <Target className="w-8 h-8" />
                {t('model.remate')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-32 bg-gray-50/20 dark:bg-brand-dark-bg/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-black text-brand-dark dark:text-white mb-16 text-center">{t('faq.title')}</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white dark:bg-brand-dark-card rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center"
                >
                  <span className="font-bold text-brand-dark dark:text-white">{t(`faq.q${i}`)}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-500 dark:text-gray-200 text-sm leading-relaxed"
                    >
                      {t(`faq.a${i}`)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final CTA Section */}
      <section id="final-cta" className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-brand-primary rounded-[4rem] p-12 md:p-24 text-center text-white shadow-2xl shadow-brand-primary/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">{t('cta.final.title')}</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">{t('cta.final.subtitle')}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="px-12 py-6 bg-white dark:bg-brand-dark-card text-brand-primary dark:text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
                {t('cta.final.btn')}
                <ArrowRight className="w-6 h-6" />
              </button>
              <p className="text-sm text-white/60 font-bold uppercase tracking-widest">Diagnóstico gratuito en 48h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Floating Button (Visual only) */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="w-16 h-16 bg-brand-secondary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all group">
          <MessageSquare className="w-8 h-8" />
          <span className="absolute right-full mr-4 bg-white dark:bg-brand-darkCard text-brand-dark dark:text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100 dark:border-white/5">
            ¿Quieres activar tu red?
          </span>
        </button>
      </div>
    </div>
  );
};

export default Landing;
