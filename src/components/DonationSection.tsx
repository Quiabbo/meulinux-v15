import React, { useState } from 'react';
import { Coffee, Copy, Check, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  pt: {
    titleDefault: 'Que tal um café para o dev? ☕',
    descriptionDefault: 'O meuLinux é um projeto 100% gratuito e sem anúncios. Sua contribuição voluntária me ajuda a manter o site no ar e a dedicar tempo para novas funcionalidades e melhorias!',
    options: [
      { id: '2', label: 'Pagar um cafézinho', emoji: '☕', value: '2,00', description: 'Um gesto simples que faz toda a diferença!' },
      { id: '5', label: 'Pagar um café reforçado', emoji: '☕☕', value: '5,00', description: 'Para manter o dev acordado e produtivo!' },
      { id: '10', label: 'Pagar um super café!', emoji: '☕☕☕', value: '10,00', description: 'Você é um verdadeiro herói do código aberto!' },
      { id: 'outro', label: 'Contribuir com outro valor', emoji: '❤️', value: 'aberto', description: 'Qualquer valor é imensamente apreciado!' }
    ],
    thanks: 'Muito obrigado pelo seu apoio!',
    scanToDonate: 'Escaneie o QR Code para doar',
    anyAmount: 'qualquer valor',
    orUsePix: 'Ou use a Chave PIX (E-mail):',
    copy: 'Copiar',
    copied: 'Copiado!',
    otherValue: 'Valor livre'
  },
  en: {
    titleDefault: 'How about a coffee for the dev? ☕',
    descriptionDefault: 'meuLinux is a 100% free project with no ads. Your voluntary contribution helps me keep the site running and dedicate time to new features and improvements!',
    options: [
      { id: '2', label: 'Buy a coffee', emoji: '☕', value: '2.00', description: 'A simple gesture that makes all the difference!' },
      { id: '5', label: 'Buy a strong coffee', emoji: '☕☕', value: '5.00', description: 'To keep the dev awake and productive!' },
      { id: '10', label: 'Buy a super coffee!', emoji: '☕☕☕', value: '10.00', description: 'You are a true open source hero!' },
      { id: 'outro', label: 'Contribute another amount', emoji: '❤️', value: 'open', description: 'Any amount is greatly appreciated!' }
    ],
    thanks: 'Thank you so much for your support!',
    scanToDonate: 'Scan the QR Code to donate',
    anyAmount: 'any amount',
    orUsePix: 'Or use the PIX Key (Email):',
    copy: 'Copy',
    copied: 'Copied!',
    otherValue: 'Custom amount'
  },
  es: {
    titleDefault: '¿Qué tal un café para el dev? ☕',
    descriptionDefault: 'meuLinux es un proyecto 100% gratuito y sin anuncios. ¡Tu contribución voluntaria me ayuda a mantener el sitio en línea y a dedicar tiempo a nuevas funcionalidades y mejoras!',
    options: [
      { id: '2', label: 'Pagar un café', emoji: '☕', value: '2,00', description: '¡Un gesto simple que marca la diferencia!' },
      { id: '5', label: 'Pagar un café cargado', emoji: '☕☕', value: '5,00', description: '¡Para mantener al dev despierto y productivo!' },
      { id: '10', label: '¡Pagar un súper café!', emoji: '☕☕☕', value: '10,00', description: '¡Eres un verdadero héroe del código abierto!' },
      { id: 'outro', label: 'Contribuir con otro valor', emoji: '❤️', value: 'abierto', description: '¡Cualquier valor es inmensamente apreciado!' }
    ],
    thanks: '¡Muchas gracias por tu apoyo!',
    scanToDonate: 'Escanea el código QR para donar',
    anyAmount: 'cualquier valor',
    orUsePix: 'O usa la Clave PIX (Email):',
    copy: 'Copiar',
    copied: '¡Copiado!',
    otherValue: 'Valor libre'
  }
};

const qrCodes = {
  '2': 'https://meulinux.com.br/wp-content/uploads/2026/02/2.png',
  '5': 'https://meulinux.com.br/wp-content/uploads/2026/02/5.png',
  '10': 'https://meulinux.com.br/wp-content/uploads/2026/02/10.png',
  'outro': 'https://meulinux.com.br/wp-content/uploads/2026/02/outro-valor.png'
};

interface DonationSectionProps {
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
}

export const DonationSection = ({ titleLine1, titleLine2, description }: DonationSectionProps) => {
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const pixKey = 'filipi.hadji.dsg@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const selectedOption = t.options.find(opt => opt.id === selectedId);

  return (
    <section id="secao-apoio" className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-6">
            <Coffee size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-dark">
            {titleLine1 && <span className="block mb-1">{titleLine1}</span>}
            {titleLine2 || t.titleDefault}
          </h2>
          <div className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {description ? (
              description
            ) : (
              <p>{t.descriptionDefault}</p>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {t.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedId(option.id)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 text-sm font-bold flex flex-col items-center gap-2 group ${
                selectedId === option.id
                  ? 'border-primary bg-primary text-white shadow-lg scale-105'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-primary hover:text-white hover:border-primary hover:shadow-md'
              }`}
            >
              <span className="text-2xl mb-1">{option.emoji}</span>
              <span className="text-center leading-tight">{option.label}</span>
              <span className={`text-xl font-bold mt-1 transition-colors ${
                selectedId === option.id ? 'text-white' : 'text-gray-500 group-hover:text-white'
              }`}>
                {option.id === 'outro' ? t.otherValue : `R$ ${option.value}`}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedId && selectedOption && (
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-primary/10 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 text-primary mb-4">
                  <Heart size={20} className="fill-current" />
                  <h3 className="font-bold text-lg">{t.thanks}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  {selectedId === 'outro' 
                    ? `${t.scanToDonate} ${t.anyAmount}:` 
                    : `${t.scanToDonate} R$ ${selectedOption.value}:`}
                </p>

                <div className="bg-gray-50 p-4 rounded-2xl inline-block mb-6 border border-gray-100">
                  <img 
                    src={qrCodes[selectedId as keyof typeof qrCodes]} 
                    alt={`QR Code PIX R$ ${selectedOption.value}`}
                    className="w-[180px] h-[180px] object-contain mx-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-500">{t.orUsePix}</p>
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200 group">
                    <code className="flex-1 text-sm font-mono text-dark overflow-hidden text-ellipsis">
                      {pixKey}
                    </code>
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                        copied 
                          ? 'bg-green-500 text-white' 
                          : 'bg-dark text-white hover:bg-primary'
                      }`}
                    >
                      {copied ? (
                        <><Check size={14} /> {t.copied}</>
                      ) : (
                        <><Copy size={14} /> {t.copy}</>
                      )}
                    </button>
                  </div>
                </div>
                
                <p className="mt-6 text-xs text-gray-400 italic">
                  {selectedOption.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
