import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, PlusCircle, RefreshCw } from 'lucide-react';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { SEO } from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { DonationSection } from '../components/DonationSection';
import { AudioReader } from '../components/AudioReader';

const defaultTranslations = {
  pt: {
    title: "Contato",
    subtitle: "Que bom ter você por aqui!",
    tab_instruction: "Clique em uma das abas abaixo e selecione o motivo do contato",
    tab_contact: "Contato",
    tab_send_distro: "Envie uma distro",
    label_name: "Nome",
    placeholder_name: "Seu nome",
    label_email: "Email",
    placeholder_email: "seu@email.com",
    label_distro_name: "Nome da Distro",
    placeholder_distro_name: "Ex: Ubuntu",
    label_message_contact: "Escreva o motivo do seu contato",
    label_message_distro: "Descrição ou Link da Distro",
    placeholder_message: "Sua mensagem aqui...",
    button_send: "Enviar",
    sending: "Enviando...",
    success_message: "Mensagem enviada com sucesso!",
    error_message: "Ocorreu um erro ao enviar. Tente novamente.",
    donation_title1: "Gostou do projeto?",
    donation_title2: "Que tal um café para o dev? ☕"
  },
  en: {
    title: "Contact",
    subtitle: "Great to have you here!",
    tab_instruction: "Click on one of the tabs below and select the reason for contact",
    tab_contact: "Contact",
    tab_send_distro: "Send a distro",
    label_name: "Name",
    placeholder_name: "Your name",
    label_email: "Email",
    placeholder_email: "your@email.com",
    label_distro_name: "Distro Name",
    placeholder_distro_name: "Ex: Ubuntu",
    label_message_contact: "Write the reason for your contact",
    label_message_distro: "Description or Distro Link",
    placeholder_message: "Your message here...",
    button_send: "Send",
    sending: "Sending...",
    success_message: "Message sent successfully!",
    error_message: "An error occurred while sending. Please try again.",
    donation_title1: "Did you like the project?",
    donation_title2: "How about a coffee for the dev? ☕"
  },
  es: {
    title: "Contacto",
    subtitle: "¡Qué bueno tenerte por aquí!",
    tab_instruction: "Haz clic en una de las pestañas de abajo y selecciona el motivo del contacto",
    tab_contact: "Contacto",
    tab_send_distro: "Enviar una distro",
    label_name: "Nombre",
    placeholder_name: "Tu nombre",
    label_email: "Correo electrónico",
    placeholder_email: "tu@correo.com",
    label_distro_name: "Nombre de la Distro",
    placeholder_distro_name: "Ej: Ubuntu",
    label_message_contact: "Escribe el motivo de tu contacto",
    label_message_distro: "Descripción o Enlace de la Distro",
    placeholder_message: "Tu mensaje aquí...",
    button_send: "Enviar",
    sending: "Enviando...",
    success_message: "¡Mensaje enviado con éxito!",
    error_message: "Ocurrió un error al enviar. Inténtalo de nuevo.",
    donation_title1: "¿Te gustó el proyecto?",
    donation_title2: "¿Qué tal un café para o dev? ☕"
  }
};

export const Contato = () => {
  const [activeTab, setActiveTab] = useState<'contato' | 'distro'>('contato');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { lang } = useLanguage();
  const translations = useTranslations('contato', defaultTranslations);
  const t = translations[lang];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.currentTarget);
    // Campos especiais do FormSubmit
    formData.append('_subject', activeTab === 'contato' ? 'Novo Contato - Meu Linux' : 'Sugestão de Distro - Meu Linux');
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    try {
      const response = await fetch('https://formsubmit.co/ajax/filipi.hadji.dsg@gmail.com', { 
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Contato | Fale Conosco ou Sugira uma Distro"
        description="Entre em contato com a equipe do Meu Linux. Envie suas dúvidas, sugestões ou indique uma nova distribuição Linux para nosso catálogo."
        canonical="https://meulinux.com.br/contato"
      />
      <section className="bg-dark text-white py-24 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-4"
          >
            {t.title}
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
        <div className="container-custom max-w-3xl">
          <AudioReader text={`${t.subtitle} ${t.tab_instruction}`} />
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600">{t.tab_instruction}</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8" role="tablist" aria-label="Motivo do contato">
            <button
              role="tab"
              aria-selected={activeTab === 'contato'}
              aria-controls="panel-contato"
              id="tab-contato"
              onClick={() => setActiveTab('contato')}
              className={`flex-1 py-4 rounded-[6px] font-bold flex items-center justify-center gap-2 transition-all focus:ring-2 focus:ring-primary outline-none ${
                activeTab === 'contato' ? 'bg-primary text-white shadow-lg' : 'bg-white text-dark hover:bg-gray-100'
              }`}
            >
              <Send size={20} aria-hidden="true" /> {t.tab_contact}
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'distro'}
              aria-controls="panel-distro"
              id="tab-distro"
              onClick={() => setActiveTab('distro')}
              className={`flex-1 py-4 rounded-[6px] font-bold flex items-center justify-center gap-2 transition-all focus:ring-2 focus:ring-primary outline-none ${
                activeTab === 'distro' ? 'bg-primary text-white shadow-lg' : 'bg-white text-dark hover:bg-gray-100'
              }`}
            >
              <PlusCircle size={20} aria-hidden="true" /> {t.tab_send_distro}
            </button>
          </div>

          {/* Form */}
          <motion.div
            key={activeTab}
            id={activeTab === 'contato' ? 'panel-contato' : 'panel-distro'}
            role="tabpanel"
            aria-labelledby={activeTab === 'contato' ? 'tab-contato' : 'tab-distro'}
            initial={{ opacity: 0, x: activeTab === 'contato' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">{t.label_name}</label>
                  <input 
                    id="name"
                    name="name"
                    type="text" 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder={t.placeholder_name}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">{t.label_email}</label>
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder={t.placeholder_email}
                  />
                </div>
              </div>
              
              {activeTab === 'distro' && (
                <div>
                  <label htmlFor="distro-name" className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">{t.label_distro_name}</label>
                  <input 
                    id="distro-name"
                    name="distro_name"
                    type="text" 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder={t.placeholder_distro_name}
                  />
                </div>
              )}

              <div>
                <label htmlFor="message" className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">
                  {activeTab === 'contato' ? t.label_message_contact : t.label_message_distro}
                </label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder={t.placeholder_message}
                ></textarea>
              </div>

              <button 
                disabled={status === 'sending'}
                className="w-full bg-dark text-white py-4 rounded-[6px] font-bold text-lg hover:bg-primary transition-all shadow-lg focus:ring-4 focus:ring-primary/20 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="animate-spin" size={20} />
                    {t.sending}
                  </span>
                ) : t.button_send}
              </button>

              {status === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 font-bold text-center"
                >
                  {t.success_message}
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 font-bold text-center"
                >
                  {t.error_message}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
      <DonationSection titleLine1={t.donation_title1} titleLine2={t.donation_title2} />
    </div>
  );
};
