import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { SEO } from '../components/SEO';
import { CATEGORIES } from '../constants';
import { useDistros } from '../hooks/useDistros';
import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '../contexts/LanguageContext';
import { DISTRO_TRANSLATIONS } from '../data/distroTranslations';

const defaultTranslations = {
  pt: {
    heroTitle: "Buscando qual Linux instalar?",
    heroSubtitle: "Nós te ajudamos a decidir",
    heroDescription: "Encontre, compare e baixe.",
    searchPlaceholder: "Pesquise por distros Linux...",
    searchButton: "Buscar",
    beginnerText: "É iniciante no Linux?",
    beginnerLink: "DistroMatch",
    beginnerSubtext: "Uma ferramenta que te ajuda encontrar a distro ideal.",
    postDownloadTitle: "O que fazer depois de instalar sua distro?",
    viewArticle: "Saiba mais",
    distroListTitle: "Encontre e baixe a sua distro Linux",
    backToTop: "Voltar ao topo",
    allDistros: "Todas as distros",
    learnMore: "Conhecer e Baixar",
    categories: {
      "Todas as distros": "Todas as distros",
      "Pc antigo": "PC antigo",
      "Brasileira": "Brasileira",
      "Hacking": "Hacking",
      "Jogos": "Jogos",
      "Educação": "Educacional",
      "Raspberry": "Raspberry Pi",
      "Design": "Design",
      "Servidor": "Servidor",
      "Cinnamon": "Cinnamon",
      "Gnome": "Gnome",
      "KDE": "KDE",
      "LXDE": "LXDE",
      "LXQt": "LXQt",
      "Mate": "Mate",
      "Pantheon": "Pantheon",
      "Plasma": "Plasma",
      "Unity": "Unity",
      "XFCE": "XFCE",
      "Multimidia": "Multimídia"
    }
  },
  en: {
    heroTitle: "Looking for which Linux to install?",
    heroSubtitle: "We help you decide",
    heroDescription: "Find, compare and download.",
    searchPlaceholder: "Search for Linux distros...",
    searchButton: "Search",
    beginnerText: "New to Linux?",
    beginnerLink: "DistroMatch",
    beginnerSubtext: "A tool that helps you choose the best distro.",
    postDownloadTitle: "What to do after downloading your distro?",
    viewArticle: "Learn more",
    distroListTitle: "Find and download your Linux distro",
    backToTop: "Back to top",
    allDistros: "All distros",
    learnMore: "Learn and Download",
    categories: {
      "Todas as distros": "All distros",
      "Pc antigo": "Old PC",
      "Brasileira": "Brazilian",
      "Hacking": "Hacking",
      "Jogos": "Gaming",
      "Educação": "Education",
      "Raspberry": "Raspberry Pi",
      "Design": "Design",
      "Servidor": "Server",
      "Cinnamon": "Cinnamon",
      "Gnome": "Gnome",
      "KDE": "KDE",
      "LXDE": "LXDE",
      "LXQt": "LXQt",
      "Mate": "Mate",
      "Pantheon": "Pantheon",
      "Plasma": "Plasma",
      "Unity": "Unity",
      "XFCE": "XFCE",
      "Multimidia": "Multimedia"
    }
  },
  es: {
    heroTitle: "¿Buscando qué Linux instalar?",
    heroSubtitle: "Te ayudamos a decidir",
    heroDescription: "Encuentra, compara y descarga.",
    searchPlaceholder: "Busca distros Linux...",
    searchButton: "Buscar",
    beginnerText: "¿Eres nuevo en Linux?",
    beginnerLink: "DistroMatch",
    beginnerSubtext: "Una herramienta que te ayuda a elegir la mejor distro.",
    postDownloadTitle: "¿Qué hacer después de descargar tu distro?",
    viewArticle: "Saber más",
    distroListTitle: "Encuentra y descarga tu distro Linux",
    backToTop: "Volver arriba",
    allDistros: "Todas las distros",
    learnMore: "Conocer y Descargar",
    categories: {
      "Todas as distros": "Todas las distros",
      "Pc antigo": "PC antiguo",
      "Brasileira": "Brasileña",
      "Hacking": "Hacking",
      "Jogos": "Juegos",
      "Educação": "Educación",
      "Raspberry": "Raspberry Pi",
      "Design": "Diseño",
      "Servidor": "Servidor",
      "Cinnamon": "Cinnamon",
      "Gnome": "Gnome",
      "KDE": "KDE",
      "LXDE": "LXDE",
      "LXQt": "LXQt",
      "Mate": "Mate",
      "Pantheon": "Pantheon",
      "Plasma": "Plasma",
      "Unity": "Unity",
      "XFCE": "XFCE",
      "Multimidia": "Multimedia"
    }
  }
};

// Simple mapping for distro subtitles and descriptions that need translation
// In a real app, these would be in a CMS or a more robust translation file

export const Home = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const { lang } = useLanguage();
  const translations = useTranslations('home', defaultTranslations);
  const t = translations[lang];
  const DISTROS = useDistros();
  
  const [selectedCategory, setSelectedCategory] = useState("Todas as distros");
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCategory("Todas as distros");
  }, [lang]);

  useEffect(() => {
    const s = searchParams.get('search');
    if (s) setSearch(s);
  }, [searchParams]);

  const filteredDistros = DISTROS.filter(distro => {
    const matchesSearch = distro.name.toLowerCase().includes(search.toLowerCase()) || 
                         distro.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "Todas as distros" || distro.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const getTranslatedDistro = (distro: typeof DISTROS[0]) => {
    if (lang === 'pt') return distro;
    const trans = DISTRO_TRANSLATIONS[lang]?.[distro.id];
    if (!trans) return distro;
    return {
      ...distro,
      subtitle: trans.subtitle || distro.subtitle,
      description: trans.description || distro.description
    };
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Meu Linux | Encontre, Baixe e Aprenda Tudo Sobre Distros Linux"
        description="Descubra o mundo Linux com o Meu Linux. Encontre as melhores distribuições, guias de instalação, tutoriais de pós-instalação e muito mais para iniciantes e avançados."
        canonical="https://meulinux.com.br/"
      />
      {/* Hero Section */}
      <section className="relative bg-dark text-white py-24 overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column: Content */}
            <div className="text-left">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-5xl font-display font-bold mb-1 text-primary leading-tight"
              >
                {t.heroTitle}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-4xl font-display font-bold mb-2 text-white leading-tight"
              >
                {t.heroSubtitle}
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/80 mb-8"
              >
                {t.heroDescription}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative mb-12 max-w-lg"
              >
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-white text-dark rounded-[6px] py-4 px-8 pl-14 pr-32 text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 search-input"
                    value={search}
                    onChange={handleSearchChange}
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 search-icon" />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-[6px] font-bold hover:bg-primary/90 transition-all"
                  >
                    {t.searchButton}
                  </button>
                </form>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-lg hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <Link to="/distromatch" className="block w-full h-full text-white/80 no-underline">
                  <p>
                    <strong>{t.beginnerText}</strong> Use o <span className="text-primary font-bold hover:underline" aria-label="Ferramenta Distro Match"><span className="font-normal">Distro</span>Match</span>
                    <br />
                    {t.beginnerSubtext}
                  </p>
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Banner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <a 
                href="https://iatutor.meulinux.com.br/" 
                target="_blank" 
                rel="noreferrer"
                className="block group relative"
              >
                <img 
                  src="https://meulinux.com.br/wp-content/uploads/2026/02/8888-1.png" 
                  alt="Aprenda Linux e DevOps"
                  className="relative rounded-[6px] shadow-2xl border-2 border-primary hover:scale-[1.02] transition-transform duration-500 w-full"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback if image fails
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/linux/800/400';
                  }}
                />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Post-Download Section */}
      <section className="py-4 bg-primary text-white">
        <div className="container-custom flex items-center justify-center gap-6">
          <h2 className="text-lg md:text-xl font-bold">{t.postDownloadTitle}</h2>
          <Link 
            to="/pos-instalacao"
            className="border-2 border-white text-white px-6 py-2 rounded-[6px] hover:bg-white hover:text-primary transition-all text-sm md:text-base whitespace-nowrap font-normal"
          >
            {t.viewArticle}
          </Link>
        </div>
      </section>

      {/* Distro List Section */}
      <section ref={resultsRef} className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">{t.distroListTitle}</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-[6px] text-sm font-medium transition-all home-filter-btn ${
                  selectedCategory === cat 
                    ? 'bg-primary text-white shadow-lg active' 
                    : 'bg-[#E2E2E2] text-dark hover:bg-gray-300'
                }`}
              >
                {t.categories[cat as keyof typeof t.categories] || cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDistros.map((distro, i) => {
              const translatedDistro = getTranslatedDistro(distro);
              return (
                <motion.div
                  key={distro.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link 
                    to={`/${distro.id}`}
                    className="bg-white distro-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100 block h-full"
                  >
                    <div className="h-16 w-16 mb-4 flex items-center justify-center bg-gray-50 rounded-xl distro-card">
                      <img src={distro.logo} alt={distro.name} className="max-h-12 max-w-12 object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-dark">{distro.name}</h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2">{translatedDistro.subtitle}</p>
                    <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                      {t.learnMore} <ArrowRight size={18} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
};
