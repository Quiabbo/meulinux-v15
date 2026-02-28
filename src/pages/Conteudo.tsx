import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Share2, ExternalLink, Calendar, Tag, Volume2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AudioReader } from '../components/AudioReader';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { SEO } from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { contentTranslations } from '../data/contentTranslations';

export type ContentSection = 'gnu-linux' | 'software-livre' | 'open-source';

const uiTranslations = {
  pt: {
    hero_title: 'Conteúdos Essenciais',
    hero_subtitle: 'Aprenda os fundamentos do mundo GNU/Linux e Software Livre.',
    essential_title: 'Fundamentos & Conceitos',
    read_more: 'Ler conteúdo completo',
    back_button: 'Voltar para Conteúdos',
    quick_concept: 'Conceito Rápido',
    known_softwares: 'Softwares Livres Conhecidos',
    share: 'Compartilhar',
    last_update: 'Última atualização: Fevereiro de 2026',
    explore_others: 'Explorar outros conteúdos',
    tags: 'Tags'
  },
  en: {
    hero_title: 'Essential Content',
    hero_subtitle: 'Learn the fundamentals of the GNU/Linux and Free Software world.',
    essential_title: 'Fundamentals & Concepts',
    read_more: 'Read full content',
    back_button: 'Back to Content',
    quick_concept: 'Quick Concept',
    known_softwares: 'Known Free Software',
    share: 'Share',
    last_update: 'Last update: February 2026',
    explore_others: 'Explore other content',
    tags: 'Tags'
  },
  es: {
    hero_title: 'Contenidos Esenciales',
    hero_subtitle: 'Aprende los fundamentos del mundo GNU/Linux y Software Libre.',
    essential_title: 'Fundamentos & Conceptos',
    read_more: 'Leer contenido completo',
    back_button: 'Volver a Contenidos',
    quick_concept: 'Concepto Rápido',
    known_softwares: 'Softwares Libres Conocidos',
    share: 'Compartir',
    last_update: 'Última actualización: Febrero de 2026',
    explore_others: 'Explorar otros contenidos',
    tags: 'Etiquetas'
  }
};

export const Conteudo = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = uiTranslations[lang];
  const contentData = contentTranslations[lang];

  // Find if slug is an essential content ID
  const selectedEssentialId = (Object.keys(contentData) as ContentSection[]).find(id => id === slug) || null;

  const handleBack = () => {
    navigate('/conteudo');
  };

  const isDetailView = !!slug;
  const isNotFound = slug && !selectedEssentialId;

  return (
    <div className="min-h-screen pt-20 bg-light">
      <SEO 
        title={selectedEssentialId 
          ? contentData[selectedEssentialId].title 
          : isNotFound
            ? '404 - Conteúdo não encontrado'
            : t.hero_title}
        description={selectedEssentialId 
          ? contentData[selectedEssentialId].subtitle 
          : isNotFound
            ? 'O conteúdo que você procura não existe ou foi movido.'
            : t.hero_subtitle}
        ogType="website"
        canonical="https://meulinux.com.br/conteudo"
      />
      <section className="bg-dark text-white py-16 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              {selectedEssentialId 
                ? contentData[selectedEssentialId].title 
                : isNotFound
                  ? '404'
                  : t.hero_title}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              {selectedEssentialId 
                ? contentData[selectedEssentialId].subtitle 
                : isNotFound
                  ? 'Conteúdo não encontrado'
                  : t.hero_subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-12">
        <AnimatePresence mode="wait">
          {isNotFound ? (
            <motion.div
              key="404"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-3xl font-bold mb-4">Ops! Conteúdo não encontrado.</h2>
              <p className="text-gray-500 mb-8">O artigo que você está procurando não existe ou foi removido.</p>
              <Link
                to="/conteudo"
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg"
              >
                {t.back_button}
              </Link>
            </motion.div>
          ) : !isDetailView ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20"
            >
              {/* Essential Content Section - Distinct Layout */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-1 w-12 bg-primary rounded-full" />
                  <h2 className="text-3xl font-display font-bold text-dark">{t.essential_title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(Object.keys(contentData) as ContentSection[]).map((id) => (
                    <Link
                      key={id}
                      to={`/conteudo/${id}`}
                      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all text-left flex flex-col border border-gray-100 h-full"
                    >
                      <div className="aspect-[16/9] relative overflow-hidden bg-gray-50">
                        <img
                          src={contentData[id].image}
                          alt={contentData[id].title}
                          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-white font-bold text-sm flex items-center gap-2">
                            {t.read_more} <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-display font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                          {contentData[id].title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2">
                          {contentData[id].subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-500 hover:text-primary font-bold mb-8 transition-colors group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> {t.back_button}
              </button>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-12">
                  {selectedEssentialId && (
                    <>
                      <AudioReader 
                        title={contentData[selectedEssentialId].title} 
                        text={`${contentData[selectedEssentialId].concept}. ${contentData[selectedEssentialId].sections.map(s => `${s.heading}. ${s.paragraphs.join(' ')}`).join(' ')}`} 
                      />

                      <div className="bg-primary/5 border-l-4 border-primary p-6 mb-12 rounded-r-xl">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">{t.quick_concept}</h3>
                        <p className="text-lg text-dark leading-relaxed italic">
                          {contentData[selectedEssentialId].concept}
                        </p>
                      </div>

                      <div className="space-y-16">
                        {contentData[selectedEssentialId].sections.map((section, idx) => (
                          <div key={idx} className="space-y-8">
                            {section.image && (
                              <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100">
                                <img
                                  src={section.image}
                                  alt={section.heading}
                                  className="w-full h-auto object-cover max-h-[400px]"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            )}
                            <div className="space-y-6">
                              <h2 className="text-3xl font-display font-bold text-dark border-b-2 border-primary/10 pb-4">
                                {section.heading}
                              </h2>
                              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                                {section.paragraphs.map((p, pIdx) => (
                                  <p key={pIdx}>{p}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}

                        {selectedEssentialId === 'software-livre' && contentData['software-livre'].softwares && (
                          <div className="pt-12 border-t border-gray-100">
                            <h2 className="text-3xl font-display font-bold text-dark mb-8">{t.known_softwares}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                              {Object.entries(contentData['software-livre'].softwares).map(([category, list]) => (
                                <div key={category} className="bg-gray-50 p-6 rounded-xl">
                                  <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">{category}</h3>
                                  <ul className="space-y-2">
                                    {list.map(software => (
                                      <li key={software.name}>
                                        <a 
                                          href={software.url} 
                                          target="_blank" 
                                          rel="noreferrer"
                                          className="flex items-center gap-3 text-dark font-medium hover:text-primary transition-colors group/link"
                                        >
                                          <div className="w-6 h-6 flex items-center justify-center bg-white rounded-sm p-0.5 shadow-sm border border-gray-100 group-hover/link:border-primary/30 transition-colors">
                                            <img 
                                              src={software.icon} 
                                              alt="" 
                                              className="max-w-full max-h-full object-contain"
                                              referrerPolicy="no-referrer"
                                            />
                                          </div>
                                          {software.name}
                                          <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-dark px-4 py-2 rounded-xl font-bold transition-colors">
                        <Share2 size={18} /> {t.share}
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 italic">
                      {t.last_update}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleBack}
                  className="bg-dark text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary transition-all shadow-lg"
                >
                  {t.explore_others}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
