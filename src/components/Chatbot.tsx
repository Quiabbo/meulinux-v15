import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { DISTROS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

const chatbotTranslations = {
  pt: {
    welcome: 'Olá! Sou o assistente do meuLinux. Como posso te ajudar a encontrar a distro Linux ideal?',
    greeting_response: 'Olá! Como posso te ajudar hoje com o Linux?',
    recommendation_response: 'Para iniciantes, recomendo o **Linux Mint** ou **Ubuntu**. Se quiser algo mais específico, use nossa ferramenta **Distro Match**!',
    error_response: 'Desculpe, tive um problema ao processar sua pergunta.',
    general_error: 'Ops! Ocorreu um erro. Tente novamente mais tarde.',
    support_title: 'Suporte meuLinux',
    typing: 'Digitando...',
    placeholder: 'Sua pergunta...',
    system_instruction: `Você é o assistente virtual do site meuLinux.com.br. 
          Seu objetivo é ajudar usuários a escolherem distribuições Linux.
          Você tem acesso aos seguintes dados de distros: {distros}.
          Responda de forma amigável, técnica mas acessível. 
          Se não souber algo, recomende que o usuário use a ferramenta Distro Match no site.
          Use Markdown para formatar suas respostas.
          Responda no idioma: Português.`
  },
  en: {
    welcome: 'Hello! I am the meuLinux assistant. How can I help you find the ideal Linux distro?',
    greeting_response: 'Hello! How can I help you today with Linux?',
    recommendation_response: 'For beginners, I recommend **Linux Mint** or **Ubuntu**. If you want something more specific, use our **Distro Match** tool!',
    error_response: 'Sorry, I had a problem processing your question.',
    general_error: 'Oops! An error occurred. Please try again later.',
    support_title: 'meuLinux Support',
    typing: 'Typing...',
    placeholder: 'Your question...',
    system_instruction: `You are the virtual assistant for the meuLinux.com.br website. 
          Your goal is to help users choose Linux distributions.
          You have access to the following distro data: {distros}.
          Respond in a friendly, technical but accessible way. 
          If you don't know something, recommend that the user use the Distro Match tool on the site.
          Use Markdown to format your answers.
          Respond in language: English.`
  },
  es: {
    welcome: '¡Hola! Soy el asistente de meuLinux. ¿Cómo puedo ayudarte a encontrar la distro Linux ideal?',
    greeting_response: '¡Hola! ¿Cómo puedo ayudarte hoy con Linux?',
    recommendation_response: 'Para principiantes, recomiendo **Linux Mint** o **Ubuntu**. ¡Si quieres algo más específico, usa nuestra herramienta **Distro Match**!',
    error_response: 'Lo siento, tuve un problema al procesar tu pregunta.',
    general_error: '¡Ups! Ocurrió un error. Inténtalo de nuevo más tarde.',
    support_title: 'Soporte meuLinux',
    typing: 'Escribiendo...',
    placeholder: 'Tu pregunta...',
    system_instruction: `Eres el asistente virtual del sitio web meuLinux.com.br. 
          Tu objetivo es ayudar a los usuarios a elegir distribuciones de Linux.
          Tienes acceso a los siguientes datos de distros: {distros}.
          Responde de forma amable, técnica pero accesible. 
          Si no sabes algo, recomienda que el usuario use la herramienta Distro Match en el sitio.
          Usa Markdown para formatear tus respuestas.
          Responde en el idioma: Español.`
  }
};

export const Chatbot = () => {
  const { lang } = useLanguage();
  const t = chatbotTranslations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: t.welcome }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update initial message if language changes and it's the only message
    if (messages.length === 1 && messages[0].role === 'bot') {
      setMessages([{ role: 'bot', text: t.welcome }]);
    }
  }, [lang, t.welcome]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      // Basic local responses for common questions
      const lowerText = userText.toLowerCase();
      const greetings = {
        pt: ['olá', 'oi', 'bom dia'],
        en: ['hello', 'hi', 'good morning'],
        es: ['hola', 'buenos días']
      };
      
      const recommendations = {
        pt: ['qual distro', 'recomenda', 'melhor distro'],
        en: ['which distro', 'recommend', 'best distro'],
        es: ['qué distro', 'recomienda', 'mejor distro']
      };

      if (greetings[lang].some(g => lowerText.includes(g))) {
        setMessages(prev => [...prev, { role: 'bot', text: t.greeting_response }]);
        setIsLoading(false);
        return;
      }

      if (recommendations[lang].some(r => lowerText.includes(r))) {
        setMessages(prev => [...prev, { role: 'bot', text: t.recommendation_response }]);
        setIsLoading(false);
        return;
      }

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: userText }] }],
        config: {
          systemInstruction: t.system_instruction.replace('{distros}', JSON.stringify(DISTROS)),
        }
      });

      const botText = response.text || t.error_response;
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: t.general_error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-gray-100"
          >
            {/* Header */}
            <div className="bg-dark text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="text-primary" />
                <span className="font-bold">{t.support_title}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-100 text-dark rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none animate-pulse">
                    {t.typing}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={t.placeholder}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-2 text-sm focus:outline-none focus:border-primary"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-primary text-white p-2 rounded-[6px] hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-4 rounded-[6px] shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageSquare />
      </button>
    </div>
  );
};
