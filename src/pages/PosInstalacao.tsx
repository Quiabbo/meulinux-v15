import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Box, Settings, Terminal, CheckCircle2, Info, ArrowRight, Monitor, Cpu, HardDrive, User, Target, ChevronRight, RotateCcw, Shield, Layout, ShoppingBag, Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { AudioReader } from '../components/AudioReader';
import { DonationSection } from '../components/DonationSection';
import { SEO } from '../components/SEO';
import { POST_INSTALL_DATA, PostInstallGuide } from '../data/postInstallData';
import { POST_INSTALL_TRANSLATIONS } from '../data/postInstallTranslations';

const translations = {
  pt: {
    hero_title: "Guia Pós-Instalação Personalizado",
    hero_subtitle: "Tudo o que você precisa fazer depois de instalar sua distro Linux",
    step1_q: "Qual distribuição você instalou?",
    label_select_distro: "Selecione sua distro",
    placeholder_select: "Selecione uma distro...",
    instruction_text: "Escolha a distribuição que você acabou de instalar para receber um guia passo a passo.",
    guide_title: "Guia Pós-Instalação para {distro}",
    button_generate: "Gerar Guia",
    button_reset: "Escolher outra distro",
    intro_greeting: "Olá! Que ótima escolha! Agora que você instalou o {distro}, vamos dar os primeiros passos para deixá-lo pronto para uso e totalmente atualizado. Siga este guia para otimizar sua experiência.",
    section1_title: "1. Atualizando o Sistema (O Primeiro e Mais Importante Passo!)",
    section1_desc: "Manter seu sistema atualizado é crucial para a segurança, estabilidade e para ter acesso aos recursos mais recentes. Os comandos para isso variam um pouco dependendo da \"família\" da sua distro. Veja como fazer no {distro}:",
    section2_title: "2. Instalando Drivers Adicionais (Placa de Vídeo, Wi-Fi, etc.)",
    section2_desc: "Alguns componentes do seu computador podem precisar de drivers proprietários para funcionar perfeitamente, especialmente placas de vídeo NVIDIA/AMD ou adaptadores Wi-Fi. Veja como verificar e instalar:",
    section3_title: "3. Instalando Codecs Multimídia Essenciais",
    section3_desc: "Para reproduzir vídeos e músicas em diversos formatos (MP3, MP4, etc.), você pode precisar de codecs adicionais. Veja como instalá-los:",
    section4_title: "4. Instalando Software Essencial (Navegador, Suíte Office, etc.)",
    section4_desc: "Agora que o básico está configurado, vamos instalar alguns programas que você provavelmente vai usar no dia a dia:",
    section5_title: "5. Personalizando seu Ambiente (Onde a Magia Aconce!)",
    section5_desc: "Uma das melhores partes do Linux é a liberdade de personalização. Você pode mudar a aparência, os ícones, os temas e muito mais para deixar o sistema com a sua cara. Explore as configurações do seu ambiente de desktop:",
    section6_title: "6. Explorando a Loja de Aplicativos",
    section6_desc: "Se sua distro possui uma loja de aplicativos gráfica, ela é uma forma fácil e segura de encontrar e instalar novos programas sem usar o terminal. Dê uma olhada!",
    label_browser: "Navegador Web (Ex: Google Chrome, Brave):",
    label_office: "Suíte Office (Ex: LibreOffice, OnlyOffice):",
    label_others: "Outros programas úteis (Ex: VLC, GIMP, Spotify):",
    donation_title1: "Te ajudei?",
    donation_title2: "Que tal um café para o dev? ☕"
  },
  en: {
    hero_title: "Custom Post-Installation Guide",
    hero_subtitle: "Everything you need to do after installing your Linux distro",
    step1_q: "Which distribution did you install?",
    label_select_distro: "Select your distro",
    placeholder_select: "Select a distro...",
    instruction_text: "Choose the distribution you just installed to receive a step-by-step guide.",
    guide_title: "Post-Installation Guide for {distro}",
    button_generate: "Generate Guide",
    button_reset: "Choose another distro",
    intro_greeting: "Hello! Great choice! Now that you've installed {distro}, let's take the first steps to get it ready for use and fully updated. Follow this guide to optimize your experience.",
    section1_title: "1. Updating the System (The First and Most Important Step!)",
    section1_desc: "Keeping your system updated is crucial for security, stability, and access to the latest features. The commands for this vary slightly depending on your distro's \"family\". Here's how to do it on {distro}:",
    section2_title: "2. Installing Additional Drivers (Graphics Card, Wi-Fi, etc.)",
    section2_desc: "Some components of your computer may need proprietary drivers to work perfectly, especially NVIDIA/AMD graphics cards or Wi-Fi adapters. Here's how to check and install:",
    section3_title: "3. Installing Essential Multimedia Codecs",
    section3_desc: "To play videos and music in various formats (MP3, MP4, etc.), you may need additional codecs. Here's how to install them:",
    section4_title: "4. Installing Essential Software (Browser, Office Suite, etc.)",
    section4_desc: "Now that the basics are set up, let's install some programs you'll likely use daily:",
    section5_title: "5. Customizing Your Environment (Where the Magic Happens!)",
    section5_desc: "One of the best parts of Linux is the freedom of customization. You can change the appearance, icons, themes, and more to make the system your own. Explore your desktop environment settings:",
    section6_title: "6. Exploring the App Store",
    section6_desc: "If your distro has a graphical app store, it's an easy and safe way to find and install new programs without using the terminal. Take a look!",
    label_browser: "Web Browser (e.g., Google Chrome, Brave):",
    label_office: "Office Suite (e.g., LibreOffice, OnlyOffice):",
    label_others: "Other useful programs (e.g., VLC, GIMP, Spotify):",
    donation_title1: "Did I help you?",
    donation_title2: "How about a coffee for the dev? ☕"
  },
  es: {
    hero_title: "Guía de Post-Instalación Personalizada",
    hero_subtitle: "Todo lo que necesitas hacer después de instalar tu distro Linux",
    step1_q: "¿Qué distribución instalaste?",
    label_select_distro: "Selecciona tu distro",
    placeholder_select: "Selecciona una distro...",
    instruction_text: "Elige la distribución que acabas de instalar para recibir una guía paso a paso.",
    guide_title: "Guía de Post-Instalación para {distro}",
    button_generate: "Generar Guía",
    button_reset: "Elegir otra distro",
    intro_greeting: "¡Hola! ¡Qué gran elección! Ahora que has instalado {distro}, demos los primeros pasos para dejarlo listo para usar y totalmente actualizado. Sigue esta guía para optimizar tu experiencia.",
    section1_title: "1. Actualizando el Sistema (¡El Primer Paso y el Más Importante!)",
    section1_desc: "Mantener tu sistema actualizado es crucial para la seguridad, estabilidad y para tener acceso a las funciones más recientes. Los comandos para esto varían un poco según la \"familia\" de tu distro. Mira cómo hacerlo en {distro}:",
    section2_title: "2. Instalando Controladores Adicionales (Tarjeta de Video, Wi-Fi, etc.)",
    section2_desc: "Algunos componentes de tu computadora pueden necesitar controladores propietarios para funcionar perfectamente, especialmente tarjetas de video NVIDIA/AMD o adaptadores Wi-Fi. Mira cómo verificar e instalar:",
    section3_title: "3. Instalando Codecs Multimedia Esenciales",
    section3_desc: "Para reproducir videos y música en diversos formatos (MP3, MP4, etc.), es posible que necesites codecs adicionales. Mira cómo instalarlos:",
    section4_title: "4. Instalando Software Esencial (Navegador, Suite de Oficina, etc.)",
    section4_desc: "Ahora que lo básico está configurado, instalemos algunos programas que probablemente usarás a diario:",
    section5_title: "5. Personalizando tu Entorno (¡Donde Ocurre la Magia!)",
    section5_desc: "Una de las mejores partes de Linux es la libertad de personalización. Puedes cambiar la apariencia, los iconos, los temas y mucho más para que el sistema sea tuyo. Explora la configuración de tu entorno de escritorio:",
    section6_title: "6. Explorando la Tienda de Aplicaciones",
    section6_desc: "Si tu distro tiene una tienda de aplicaciones gráfica, es una forma fácil y segura de encontrar e instalar nuevos programas sin usar la terminal. ¡Echa un vistazo!",
    label_browser: "Navegador Web (Ej: Google Chrome, Brave):",
    label_office: "Suite de Oficina (Ej: LibreOffice, OnlyOffice):",
    label_others: "Otros programas útiles (Ej: VLC, GIMP, Spotify):",
    donation_title1: "¿Te ayudé?",
    donation_title2: "¿Qué tal un café para o dev? ☕"
  }
};

export const PosInstalacao = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [selectedDistroName, setSelectedDistroName] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  // Get translated data or fallback to original
  const currentPostInstallData = POST_INSTALL_TRANSLATIONS[lang] || POST_INSTALL_DATA;
  const selectedDistro = currentPostInstallData.find(d => d.nome === selectedDistroName) || POST_INSTALL_DATA.find(d => d.nome === selectedDistroName);

  const famousDistros = [
    "Ubuntu", "Debian", "Linux Mint", "Fedora", "Kali Linux", "Arch Linux", "Zorin OS", "Pop!_OS"
  ];

  const handleReset = () => {
    setSelectedDistroName('');
    setShowGuide(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSelection = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-dark">{t.step1_q}</h2>
        <p className="text-gray-500">{t.instruction_text}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t.label_select_distro}</label>
          <select 
            className="w-full bg-white border-2 border-gray-100 rounded-[6px] px-6 py-4 focus:outline-none focus:border-primary transition-all text-lg font-medium"
            value={selectedDistroName}
            onChange={(e) => setSelectedDistroName(e.target.value)}
          >
            <option value="">{t.placeholder_select}</option>
            {[...POST_INSTALL_DATA].sort((a, b) => a.nome.localeCompare(b.nome)).map(d => (
              <option key={d.nome} value={d.nome}>{d.nome}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button 
            disabled={!selectedDistroName}
            onClick={() => setShowGuide(true)}
            className="w-full bg-primary text-white py-4 rounded-[6px] font-bold text-lg hover:bg-primary/90 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {t.button_generate} <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {famousDistros.map(name => (
          <button
            key={name}
            onClick={() => {
              setSelectedDistroName(name);
              setShowGuide(true);
            }}
            className={`p-4 rounded-[6px] border-2 font-bold transition-all text-sm flex flex-col items-center gap-2 ${
              selectedDistroName === name 
                ? 'border-primary bg-primary/5 text-primary' 
                : 'border-gray-100 bg-white hover:border-primary/30 hover:bg-gray-50 text-gray-600'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </motion.div>
  );

  const renderGuide = () => {
    if (!selectedDistro) return null;

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        {/* Header / Intro */}
        <div className="bg-primary/5 p-8 rounded-[6px] border border-primary/10">
          <h2 className="text-3xl font-display font-bold text-dark mb-4">{t.guide_title.replace('{distro}', selectedDistro.nome)}</h2>
          
          <AudioReader 
            title={t.guide_title.replace('{distro}', selectedDistro.nome)} 
            text={`${t.intro_greeting.replace('{distro}', selectedDistro.nome)}. ${t.section1_title}: ${t.section1_desc.replace('{distro}', selectedDistro.nome)}. ${selectedDistro.explicacao_atualizacao}`} 
          />

          <p className="text-gray-700 leading-relaxed text-lg">
            {t.intro_greeting.replace('{distro}', selectedDistro.nome)}
          </p>
        </div>

        <div className="space-y-10">
          {/* 1. Atualização */}
          <section className="bg-white p-8 rounded-[6px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-primary">
              <RefreshCw size={24} /> {t.section1_title}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.section1_desc.replace('{distro}', selectedDistro.nome)}
            </p>
            <div className="bg-black text-white p-6 rounded-[6px] font-mono text-sm mb-4 relative group">
              <code className="block whitespace-pre-wrap">{selectedDistro.comandos_atualizacao}</code>
              <Terminal size={16} className="absolute top-4 right-4 text-white/20" />
            </div>
            <div className="flex gap-3 p-4 bg-blue-50 rounded-[6px] border border-blue-100">
              <Info size={20} className="text-blue-500 shrink-0 mt-1" />
              <p className="text-sm text-blue-800">{selectedDistro.explicacao_atualizacao}</p>
            </div>
          </section>

          {/* 2. Drivers */}
          <section className="bg-white p-8 rounded-[6px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-primary">
              <Shield size={24} /> {t.section2_title}
            </h3>
            <p className="text-gray-600 mb-4">{t.section2_desc}</p>
            <div className="p-4 bg-gray-50 rounded-[6px] border border-gray-200 text-gray-700">
              {selectedDistro.drivers_adicionais}
            </div>
          </section>

          {/* 3. Codecs */}
          <section className="bg-white p-8 rounded-[6px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-primary">
              <Monitor size={24} /> {t.section3_title}
            </h3>
            <p className="text-gray-600 mb-4">{t.section3_desc}</p>
            <div className="bg-black text-white p-6 rounded-[6px] font-mono text-sm mb-4">
              <code>{selectedDistro.codecs_multimidia}</code>
            </div>
            <div className="flex gap-3 p-4 bg-blue-50 rounded-[6px] border border-blue-100">
              <Info size={20} className="text-blue-500 shrink-0 mt-1" />
              <p className="text-sm text-blue-800">{selectedDistro.explicacao_codecs}</p>
            </div>
          </section>

          {/* 4. Software */}
          <section className="bg-white p-8 rounded-[6px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-primary">
              <Box size={24} /> {t.section4_title}
            </h3>
            <p className="text-gray-600 mb-6">{t.section4_desc}</p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500" /> {t.label_browser}
                </h4>
                <div className="p-4 bg-gray-50 rounded-[6px] border border-gray-200 text-sm font-mono text-gray-700">
                  {selectedDistro.software_essencial.navegador}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500" /> {t.label_office}
                </h4>
                <div className="p-4 bg-gray-50 rounded-[6px] border border-gray-200 text-sm font-mono text-gray-700">
                  {selectedDistro.software_essencial.office}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500" /> {t.label_others}
                </h4>
                <div className="p-4 bg-gray-50 rounded-[6px] border border-gray-200 text-sm font-mono text-gray-700">
                  {selectedDistro.software_essencial.outros}
                </div>
              </div>
            </div>
          </section>

          {/* 5. Personalização */}
          <section className="bg-white p-8 rounded-[6px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-primary">
              <Layout size={24} /> {t.section5_title}
            </h3>
            <p className="text-gray-600 mb-4">{t.section5_desc}</p>
            <div className="p-4 bg-gray-50 rounded-[6px] border border-gray-200 text-gray-700">
              {selectedDistro.personalizacao}
            </div>
          </section>

          {/* 6. Loja */}
          <section className="bg-white p-8 rounded-[6px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-primary">
              <ShoppingBag size={24} /> {t.section6_title}
            </h3>
            <p className="text-gray-600 mb-4">{t.section6_desc}</p>
            <div className="p-4 bg-gray-50 rounded-[6px] border border-gray-200 text-gray-700">
              {selectedDistro.loja_aplicativos}
            </div>
          </section>
        </div>

        <button 
          onClick={handleReset}
          className="w-full bg-gray-100 text-dark py-4 rounded-[6px] font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} /> {t.button_reset}
        </button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <SEO 
        title="Pós-Instalação Linux | Guia Completo para Sua Distro"
        description="Guia completo de pós-instalação para sua distribuição Linux. Comandos de atualização, instalação de drivers, codecs e softwares essenciais para iniciantes e intermediários."
        canonical="https://meulinux.com.br/pos-instalacao"
        ogType="article"
        ogImage="https://meulinux.com.br/assets/images/pos-instalacao-share-image.png"
      />
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-display font-bold mb-6"
          >
            {t.hero_title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 max-w-2xl mx-auto font-medium"
          >
            {t.hero_subtitle}
          </motion.p>
        </div>
      </section>

      {/* Interactive Flow Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-[6px] shadow-2xl p-8 md:p-16 border border-gray-100 min-h-[500px]">
            <AnimatePresence mode="wait">
              {!showGuide ? renderSelection() : renderGuide()}
            </AnimatePresence>
          </div>
        </div>
      </section>
      {showGuide && <DonationSection titleLine1={t.donation_title1} titleLine2={t.donation_title2} />}
    </div>
  );
};


