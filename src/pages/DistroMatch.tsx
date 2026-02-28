import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ArrowRight } from 'lucide-react';
import { useDistros } from '../hooks/useDistros';
import { Link } from 'react-router-dom';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { useLanguage } from '../contexts/LanguageContext';
import { DonationSection } from '../components/DonationSection';
import { DISTRO_TRANSLATIONS } from '../data/distroTranslations';

const translations = {
  pt: {
    title_match: "Match",
    subtitle: "Para garantir melhores resultados use todos os filtros",
    label_processor: "Processador",
    label_memory: "Memória",
    label_experience: "Experiência",
    label_objective: "Objetivo",
    label_video: "Vídeo",
    button_search: "Buscar",
    results_title: "Resultados para você:",
    button_learn_more: "Conhecer e Baixar",
    options_experience: ["Experiência", "Iniciante", "Intermediário", "Avançado"],
    options_objective: ["Objetivo", "Desenvolvimento", "Design", "Educação", "Hacking", "Geral"],
    options_video: [
      "Vídeo",
      "Integrado Intel (HD, UHD, Iris Xe)",
      "Integrado AMD (Radeon Vega/RDNA)",
      "NVIDIA (Antiga, série 900 ou anterior)",
      "NVIDIA (Moderna, série 1000 ou mais recente)",
      "AMD (Antiga, anterior a RDNA)",
      "AMD (Moderna, RDNA ou mais recente)"
    ],
    options_processor: [
      "Processador",
      "Antigo (32-bit, ex: Pentium 4)",
      "Básico (64-bit, ex: Intel Atom, Celeron Dual-Core)",
      "Intermediário (64-bit, ex: Core i3, Ryzen 3)",
      "Moderno (64-bit, ex: Core i5/i7, Ryzen 5/7)",
      "Avançado (64-bit, ex: Core i9, Ryzen 9)",
      "Baseado em ARM (64-bit, ex: Raspberry Pi)"
    ],
    options_memory: [
      "Memória",
      "Menos de 1 GB",
      "1 GB",
      "2 GB",
      "4 GB",
      "8 GB+"
    ],
    donation_title1: "Te ajudei?",
    donation_title2: "Que tal um café para o dev? ☕"
  },
  en: {
    title_match: "Match",
    subtitle: "To ensure better results use all filters",
    label_processor: "Processor",
    label_memory: "Memory",
    label_experience: "Experience",
    label_objective: "Objective",
    label_video: "Video",
    button_search: "Search",
    results_title: "Results for you:",
    button_learn_more: "Learn and Download",
    options_experience: ["Experience", "Beginner", "Intermediate", "Advanced"],
    options_objective: ["Objective", "Development", "Design", "Education", "Hacking", "General"],
    options_video: [
      "Video",
      "Integrated Intel (HD, UHD, Iris Xe)",
      "Integrated AMD (Radeon Vega/RDNA)",
      "NVIDIA (Old, 900 series or older)",
      "NVIDIA (Modern, 1000 series or newer)",
      "AMD (Old, pre-RDNA)",
      "AMD (Modern, RDNA or newer)"
    ],
    options_processor: [
      "Processor",
      "Old (32-bit, e.g., Pentium 4)",
      "Basic (64-bit, e.g., Intel Atom, Celeron Dual-Core)",
      "Intermediate (64-bit, e.g., Core i3, Ryzen 3)",
      "Modern (64-bit, e.g., Core i5/i7, Ryzen 5/7)",
      "Advanced (64-bit, e.g., Core i9, Ryzen 9)",
      "ARM-based (64-bit, e.g., Raspberry Pi)"
    ],
    options_memory: [
      "Memory",
      "Less than 1 GB",
      "1 GB",
      "2 GB",
      "4 GB",
      "8 GB+"
    ],
    donation_title1: "Did I help you?",
    donation_title2: "How about a coffee for the dev? ☕"
  },
  es: {
    title_match: "Match",
    subtitle: "Para garantizar mejores resultados use todos los filtros",
    label_processor: "Procesador",
    label_memory: "Memoria",
    label_experience: "Experiencia",
    label_objective: "Objetivo",
    label_video: "Vídeo",
    button_search: "Buscar",
    results_title: "Resultados para ti:",
    button_learn_more: "Conocer y Descargar",
    options_experience: ["Experiencia", "Principiante", "Intermedio", "Avanzado"],
    options_objective: ["Objetivo", "Desarrollo", "Diseño", "Educación", "Hacking", "General"],
    options_video: [
      "Vídeo",
      "Integrado Intel (HD, UHD, Iris Xe)",
      "Integrado AMD (Radeon Vega/RDNA)",
      "NVIDIA (Antigua, serie 900 o anterior)",
      "NVIDIA (Moderna, serie 1000 o más reciente)",
      "AMD (Antigua, anterior a RDNA)",
      "AMD (Moderna, RDNA o más reciente)"
    ],
    options_processor: [
      "Procesador",
      "Antiguo (32-bit, ej: Pentium 4)",
      "Básico (64-bit, ej: Intel Atom, Celeron Dual-Core)",
      "Intermedio (64-bit, ej: Core i3, Ryzen 3)",
      "Moderno (64-bit, ej: Core i5/i7, Ryzen 5/7)",
      "Avanzado (64-bit, ej: Core i9, Ryzen 9)",
      "Basado en ARM (64-bit, ej: Raspberry Pi)"
    ],
    options_memory: [
      "Memoria",
      "Menos de 1 GB",
      "1 GB",
      "2 GB",
      "4 GB",
      "8 GB+"
    ],
    donation_title1: "¿Te ayudé?",
    donation_title2: "¿Qué tal un café para el dev? ☕"
  }
};

export const DistroMatch = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const DISTROS = useDistros();

  const [filters, setFilters] = useState({
    processor: t.options_processor[0],
    memory: t.options_memory[0],
    experience: t.options_experience[0],
    objective: t.options_objective[0],
    video: t.options_video[0]
  });
  const [results, setResults] = useState<typeof DISTROS>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const matched = DISTROS.filter(() => Math.random() > 0.5);
    setResults(matched.length > 0 ? matched : [DISTROS[0]]);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-dark text-white py-24 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display mb-4"
          >
            <span className="font-normal">Distro</span><span className="font-bold">{t.title_match}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/70"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-white distro-card p-8 rounded-[6px] shadow-xl -mt-32 relative z-10 mb-16" role="search" aria-label="Filtros de busca de distros">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="processor" className="text-xs font-bold text-gray-400 uppercase ml-1">{t.label_processor}</label>
                <select 
                  id="processor"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.processor}
                  onChange={(e) => setFilters({...filters, processor: e.target.value})}
                >
                  {t.options_processor.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="memory" className="text-xs font-bold text-gray-400 uppercase ml-1">{t.label_memory}</label>
                <select 
                  id="memory"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.memory}
                  onChange={(e) => setFilters({...filters, memory: e.target.value})}
                >
                  {t.options_memory.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="experience" className="text-xs font-bold text-gray-400 uppercase ml-1">{t.label_experience}</label>
                <select 
                  id="experience"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.experience}
                  onChange={(e) => setFilters({...filters, experience: e.target.value})}
                >
                  {t.options_experience.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="objective" className="text-xs font-bold text-gray-400 uppercase ml-1">{t.label_objective}</label>
                <select 
                  id="objective"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.objective}
                  onChange={(e) => setFilters({...filters, objective: e.target.value})}
                >
                  {t.options_objective.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="video" className="text-xs font-bold text-gray-400 uppercase ml-1">{t.label_video}</label>
                <select 
                  id="video"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.video}
                  onChange={(e) => setFilters({...filters, video: e.target.value})}
                >
                  {t.options_video.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full mt-6 bg-primary text-white py-4 rounded-[6px] font-bold text-lg hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 focus:ring-4 focus:ring-primary/20 outline-none"
              aria-label={t.button_search}
            >
              <Search size={20} aria-hidden="true" /> {t.button_search}
            </button>
          </div>

          {/* Results */}
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-3xl font-display font-bold mb-8">{t.results_title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((distro, i) => {
                   const trans = DISTRO_TRANSLATIONS[lang]?.[distro.id];
                   const subtitle = trans?.subtitle || distro.subtitle;
                   
                   return (
                     <motion.div
                       key={distro.id}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: i * 0.1 }}
                     >
                       <Link 
                         to={`/${distro.id}`}
                         className="bg-white distro-card rounded-[6px] p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100 block h-full"
                       >
                         <div className="h-16 w-16 mb-4 flex items-center justify-center bg-gray-50 rounded-[6px] distro-card">
                           <img src={distro.logo} alt={distro.name} className="max-h-12 max-w-12 object-contain" referrerPolicy="no-referrer" />
                         </div>
                         <h3 className="text-xl font-bold mb-2 text-dark">{distro.name}</h3>
                         <p className="text-gray-500 text-sm mb-6 line-clamp-2">{subtitle}</p>
                         <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                           {t.button_learn_more} <ArrowRight size={18} />
                         </div>
                       </Link>
                     </motion.div>
                   );
                 })}
               </div>
            </motion.div>
          )}
        </div>
      </section>
      {hasSearched && <DonationSection titleLine1={t.donation_title1} titleLine2={t.donation_title2} />}
    </div>
  );
};
