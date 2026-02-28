import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Download, Globe, Cpu, Box, HardDrive, Info, ArrowRight, Database, X, Volume2, MonitorPlay } from 'lucide-react';
import { AudioReader } from '../components/AudioReader';
import { V86Emulator } from '../components/V86Emulator';
import { useDistros } from '../hooks/useDistros';
import { useLanguage } from '../contexts/LanguageContext';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { SEO } from '../components/SEO';
import { DISTRO_TRANSLATIONS } from '../data/distroTranslations';

const translations = {
  pt: {
    notFound: "Distro não encontrada",
    backHome: "Voltar para o início",
    about: "Sobre o",
    desktopEnvironments: "Ambientes de desktop disponíveis:",
    mainFeatures: "Principais recursos:",
    packageManager: "Gerenciador de pacotes:",
    preInstalledSoftware: "Software pré-instalado:",
    hardwareCompatibility: "Compatibilidade de hardware:",
    communitySupport: "Comunidade e suporte:",
    comparison: "Comparação com outras distribuições:",
    flavors: "Conheça também os sabores do",
    quickInfo: "Informações Rápidas",
    basedOn: "Baseado em",
    country: "País",
    architecture: "Arquitetura",
    isoFile: "Arquivo ISO",
    downloadOfficial: "Baixar no site oficial",
    testDistro: "Testar distro"
  },
  en: {
    notFound: "Distro not found",
    backHome: "Back to home",
    about: "About",
    desktopEnvironments: "Available desktop environments:",
    mainFeatures: "Main features:",
    packageManager: "Package manager:",
    preInstalledSoftware: "Pre-installed software:",
    hardwareCompatibility: "Hardware compatibility:",
    communitySupport: "Community and support:",
    comparison: "Comparison with other distributions:",
    flavors: "Also check out the flavors of",
    quickInfo: "Quick Info",
    basedOn: "Based on",
    country: "Country",
    architecture: "Architecture",
    isoFile: "ISO File",
    downloadOfficial: "Download on official site",
    testDistro: "Test distro"
  },
  es: {
    notFound: "Distro no encontrada",
    backHome: "Volver al inicio",
    about: "Sobre",
    desktopEnvironments: "Entornos de escritorio disponibles:",
    mainFeatures: "Principales características:",
    packageManager: "Gestor de paquetes:",
    preInstalledSoftware: "Software preinstalado:",
    hardwareCompatibility: "Compatibilidad de hardware:",
    communitySupport: "Comunidad y soporte:",
    comparison: "Comparación con otras distribuciones:",
    flavors: "Conoce también los sabores de",
    quickInfo: "Información Rápida",
    basedOn: "Basado en",
    country: "País",
    architecture: "Arquitectura",
    isoFile: "Archivo ISO",
    downloadOfficial: "Descargar en el sitio oficial",
    testDistro: "Probar distro"
  }
};

// Reuse the same distro translations mapping
export const DistroDetail = () => {
  const { id } = useParams();
  const { lang } = useLanguage();
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [showEmulator, setShowEmulator] = React.useState(false);
  const emulatorRef = React.useRef<HTMLDivElement>(null);
  const t = translations[lang];
  const DISTROS = useDistros();
  const distro = DISTROS.find(d => d.id === id);

  if (!distro) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <h1 className="text-4xl font-bold mb-4">{t.notFound}</h1>
        <Link to="/" className="text-primary font-bold">{t.backHome}</Link>
      </div>
    );
  }

  const getTranslatedDistro = (d: typeof DISTROS[0]) => {
    if (lang === 'pt') return d;
    const trans = DISTRO_TRANSLATIONS[lang]?.[d.id];
    if (!trans) return d;
    return {
      ...d,
      subtitle: trans.subtitle || d.subtitle,
      description: trans.description || d.description,
      desktopEnvironments: trans.desktopEnvironments || d.desktopEnvironments,
      mainFeatures: trans.mainFeatures || d.mainFeatures,
      packageManager: trans.packageManager || d.packageManager,
      preInstalledSoftware: trans.preInstalledSoftware || d.preInstalledSoftware,
      hardwareCompatibility: trans.hardwareCompatibility || d.hardwareCompatibility,
      communitySupport: trans.communitySupport || d.communitySupport,
      comparison: trans.comparison || d.comparison,
    };
  };

  const translatedDistro = getTranslatedDistro(distro);

  // SEO Logic
  let seoTitle = `${distro.name} - Meu Linux`;
  let seoDescription = translatedDistro.description.substring(0, 160);

  if (lang === 'pt') {
    if (distro.id === 'ubuntu-linux') {
      seoTitle = "Ubuntu - Uma poderosa distro para usuários iniciantes e intermediários";
      seoDescription = "O Ubuntu é uma das distribuições Linux mais populares e amplamente utilizadas. Desenvolvido pela Canonical, oferece uma experiência intuitiva e amigável.";
    } else if (distro.id === 'kali-linux') {
      seoTitle = "Kali Linux: Guia Definitivo de Segurança e Pentest (2026)";
      seoDescription = "Kali Linux explicado em profundidade. História, filosofia, ferramentas, pentest, segurança, requisitos e uso profissional atualizados para 2026.";
    } else if (distro.id === 'arch-linux') {
      seoTitle = "Arch Linux: Guia Definitivo 2026 — Rolling Release, Pacman, AUR e Controle Total";
      seoDescription = "Arch Linux explicado em profundidade. Filosofia KISS, rolling release, pacman, AUR, requisitos, vantagens e desafios atualizados para 2026.";
    } else if (distro.id === 'debian-linux') {
      seoTitle = "Debian Linux: Guia Definitivo 2026 — Estabilidade, Servidores e Base do Ecossistema";
      seoDescription = "Debian Linux explicado em profundidade. História, filosofia, estabilidade, versões, servidores, requisitos e comparações atualizadas para 2026.";
    } else if (distro.id === 'fedora-linux') {
      seoTitle = "Fedora Linux: Guia Definitivo 2026 — Inovação, Desktop e Servidores";
      seoDescription = "Fedora Linux explicado em profundidade. Filosofia, inovação, desktop, servidores, Red Hat e requisitos atualizados para 2026.";
    } else if (distro.id === 'linux-mint') {
      seoTitle = "Linux Mint: Guia Definitivo 2026 — Simplicidade e Desktop Clássico";
      seoDescription = "Linux Mint explicado em profundidade. História, filosofia, desktop Cinnamon, requisitos e comparações atualizadas para 2026.";
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonical={`https://meulinux.com.br/distro/${distro.id}`}
        ogImage={distro.logo}
      />
      {/* Hero */}
      <section className="bg-dark text-white py-24 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-32 w-32 bg-white distro-card rounded-3xl p-4 flex items-center justify-center shadow-2xl" aria-hidden="true">
              <img src={distro.logo} alt="" className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-6xl font-display font-bold mb-4"
              >
                {distro.name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-white/70"
              >
                {translatedDistro.subtitle}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Download Section */}
      <section className="py-4 bg-primary text-white">
        <div className="container-custom flex items-center justify-center gap-6">
          <h2 className="text-lg md:text-xl font-bold">
            {lang === 'pt' ? 'O que fazer depois de instalar sua distro?' : 
             lang === 'en' ? 'What to do after downloading your distro?' : 
             '¿Qué hacer después de descargar tu distro?'}
          </h2>
          <Link 
            to="/pos-instalacao"
            className="border-2 border-white text-white px-6 py-2 rounded-[6px] hover:bg-white hover:text-primary transition-all text-sm md:text-base whitespace-nowrap font-normal"
          >
            {lang === 'pt' ? 'Saiba mais' : lang === 'en' ? 'Learn more' : 'Saber más'}
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="distro-info-heading">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <article className="bg-white distro-card p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                <h2 id="distro-info-heading" className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Info className="text-primary" aria-hidden="true" /> {t.about} {distro.name}
                </h2>

                <AudioReader 
                  title={distro.name} 
                  text={`${translatedDistro.description}. ${t.desktopEnvironments} ${translatedDistro.desktopEnvironments}. ${t.mainFeatures} ${translatedDistro.mainFeatures}. ${t.packageManager} ${translatedDistro.packageManager}.`} 
                />

                {showEmulator && (
                  <div ref={emulatorRef} className="mb-8">
                    <V86Emulator 
                      isoUrl="https://meulinux.com.br/assets/isos/TinyCore-current.iso"
                      onClose={() => setShowEmulator(false)}
                    />
                  </div>
                )}

                <p className="text-lg text-gray-700 leading-relaxed mb-8 text-left">{translatedDistro.description}</p>
                
                <h3 className="text-xl font-bold mb-4">{t.desktopEnvironments}</h3>
                <p className="text-gray-600 mb-8">{translatedDistro.desktopEnvironments}</p>

                <h3 className="text-xl font-bold mb-4">{t.mainFeatures}</h3>
                <p className="text-gray-600 mb-8">{translatedDistro.mainFeatures}</p>

                <h3 className="text-xl font-bold mb-4">{t.packageManager}</h3>
                <p className="text-gray-600 mb-8">{translatedDistro.packageManager}</p>

                <h3 className="text-xl font-bold mb-4">{t.preInstalledSoftware}</h3>
                <p className="text-gray-600 mb-8">{translatedDistro.preInstalledSoftware}</p>

                <h3 className="text-xl font-bold mb-4">{t.hardwareCompatibility}</h3>
                <div className="text-gray-600 mb-8">
                  {translatedDistro.hardwareCompatibility.includes('Requisitos mínimos:') || translatedDistro.hardwareCompatibility.includes('Minimum requirements:') || translatedDistro.hardwareCompatibility.includes('Requisitos mínimos:') ? (
                    <>
                      <p className="mb-6">{translatedDistro.hardwareCompatibility.split(/Requisitos mínimos:|Minimum requirements:|Requisitos mínimos:/)[0].trim()}</p>
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-inner">
                        <p className="font-bold mb-4 text-gray-900 flex items-center gap-2">
                          <Info size={18} className="text-primary" />
                          {lang === 'pt' ? 'Requisitos mínimos:' : lang === 'en' ? 'Minimum requirements:' : 'Requisitos mínimos:'}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {translatedDistro.hardwareCompatibility.split(/Requisitos mínimos:|Minimum requirements:|Requisitos mínimos:/)[1].split(',').map((req, idx) => {
                            const cleanReq = req.trim().replace(/\.$/, '');
                            if (cleanReq.toLowerCase().includes('processador') || cleanReq.toLowerCase().includes('processor')) {
                              return (
                                <div key={idx} className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2 text-primary mb-1">
                                    <Cpu size={14} />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">{lang === 'pt' ? 'Processador' : lang === 'en' ? 'Processor' : 'Procesador'}</span>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900">{cleanReq.replace(/processador|processor/i, '').trim()}</p>
                                </div>
                              );
                            }
                            if (cleanReq.toLowerCase().includes('hd/ssd')) {
                              return (
                                <div key={idx} className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2 text-primary mb-1">
                                    <HardDrive size={14} />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">HD/SSD</span>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900">{cleanReq.replace(/hd\/ssd/i, '').trim()}</p>
                                </div>
                              );
                            }
                            if (cleanReq.toLowerCase().includes('memória') || cleanReq.toLowerCase().includes('memory') || cleanReq.toLowerCase().includes('memoria')) {
                              return (
                                <div key={idx} className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2 text-primary mb-1">
                                    <Database size={14} />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">{lang === 'pt' ? 'Memória' : lang === 'en' ? 'Memory' : 'Memoria'}</span>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900">{cleanReq.replace(/memória|memory|memoria/i, '').trim()}</p>
                                </div>
                              );
                            }
                            return (
                              <div key={idx} className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-primary mb-1">
                                  <Info size={14} />
                                  <span className="text-[10px] uppercase font-bold tracking-wider">Info</span>
                                </div>
                                <p className="text-sm font-bold text-gray-900">{cleanReq}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>{translatedDistro.hardwareCompatibility}</p>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-4">{t.communitySupport}</h3>
                <p className="text-gray-600 mb-8">{translatedDistro.communitySupport}</p>

                <h3 className="text-xl font-bold mb-4">{t.comparison}</h3>
                <p className="text-gray-600 mb-8">{translatedDistro.comparison}</p>
              </article>

              {/* Gallery Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {distro.screenshots && distro.screenshots.length > 0 ? (
                  distro.screenshots.map((screenshot, index) => (
                    <div 
                      key={index} 
                      className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage(screenshot)}
                    >
                      <img 
                        src={screenshot} 
                        alt={`${distro.name} Screenshot ${index + 1}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))
                ) : (
                  [1, 2].map(i => (
                    <div 
                      key={i} 
                      className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage(`https://picsum.photos/seed/${distro.id}${i}/1200/800`)}
                    >
                      <img 
                        src={`https://picsum.photos/seed/${distro.id}${i}/800/450`} 
                        alt="Screenshot" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white distro-card p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-28">
                <h3 className="text-xl font-bold mb-6">{t.quickInfo}</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary"><Box size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">{t.basedOn}</p>
                      <p className="font-bold">{distro.basedOn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary"><Globe size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">{t.country}</p>
                      <p className="font-bold">{distro.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary"><Cpu size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">{t.architecture}</p>
                      <p className="font-bold">{distro.architecture}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary"><HardDrive size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">{t.isoFile}</p>
                      <p className="font-bold">{distro.isoSize}</p>
                    </div>
                  </div>
                </div>

                {distro.id === 'tinycore' && (
                  <button 
                    onClick={() => {
                      setShowEmulator(true);
                      setTimeout(() => {
                        emulatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 100);
                    }}
                    className="w-full mt-8 bg-dark text-white py-4 rounded-[6px] font-bold flex items-center justify-center gap-2 hover:bg-dark/90 transition-all shadow-lg border border-white/10"
                  >
                    <MonitorPlay size={20} className="text-primary" /> {t.testDistro}
                  </button>
                )}

                <a 
                  href={distro.officialSite} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full mt-4 bg-primary text-white py-4 rounded-[6px] font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg"
                >
                  <Download size={20} /> {t.downloadOfficial}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImage} 
            alt="Full size view" 
            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};
