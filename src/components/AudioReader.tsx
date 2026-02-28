import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, RotateCcw, Square } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface AudioReaderProps {
  text: string;
  title?: string;
}

const langMap: Record<string, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES'
};

const labels = {
  pt: {
    listening: 'Lendo conteúdo...',
    paused: 'Leitura pausada',
    listen: 'Ouvir este conteúdo',
    accessibility: 'Acessibilidade • Web Speech API'
  },
  en: {
    listening: 'Reading content...',
    paused: 'Reading paused',
    listen: 'Listen to this content',
    accessibility: 'Accessibility • Web Speech API'
  },
  es: {
    listening: 'Leyendo contenido...',
    paused: 'Lectura pausada',
    listen: 'Escuchar este contenido',
    accessibility: 'Accesibilidad • Web Speech API'
  }
};

export const AudioReader: React.FC<AudioReaderProps> = ({ text }) => {
  const [status, setStatus] = useState<'idle' | 'playing' | 'paused'>('idle');
  const { lang } = useLanguage();
  const synth = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const l = labels[lang as keyof typeof labels] || labels.pt;

  useEffect(() => {
    synth.current = window.speechSynthesis;
    
    return () => {
      if (synth.current) {
        synth.current.cancel();
      }
    };
  }, []);

  const getCleanText = (rawText: string) => {
    return rawText
      .replace(/#+\s/g, '')
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`{1,3}.*?`{1,3}/gs, '')
      .replace(/>\s/g, '')
      .replace(/\n+/g, ' ')
      .trim();
  };

  const selectVoice = () => {
    if (!synth.current) return null;
    const voices = synth.current.getVoices();
    const targetLang = langMap[lang] || 'pt-BR';
    
    return voices.find(v => v.lang === targetLang) || 
           voices.find(v => v.lang.startsWith(targetLang.split('-')[0])) || 
           null;
  };

  const handlePlay = () => {
    if (!synth.current) return;

    if (synth.current.speaking && status === 'playing') return;

    if (status === 'paused') {
      synth.current.resume();
      setStatus('playing');
      return;
    }

    synth.current.cancel();

    const cleanText = getCleanText(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    const voice = selectVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = langMap[lang] || 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setStatus('idle');
    };

    utterance.onerror = () => {
      setStatus('idle');
    };

    utteranceRef.current = utterance;
    synth.current.speak(utterance);
    setStatus('playing');
  };

  const handlePause = () => {
    if (synth.current && synth.current.speaking) {
      synth.current.pause();
      setStatus('paused');
    }
  };

  const handleStop = () => {
    if (synth.current) {
      synth.current.cancel();
      setStatus('idle');
    }
  };

  const handleRestart = () => {
    handleStop();
    // Pequeno delay para garantir que o cancelamento foi processado
    setTimeout(() => {
      handlePlay();
    }, 50);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 mb-8"
    >
      <div className="flex items-center gap-2">
        {status === 'idle' ? (
          <button
            onClick={handlePlay}
            className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:scale-105 transition-transform shadow-lg"
            title="Ouvir este conteúdo"
          >
            <Play size={24} className="ml-1" />
          </button>
        ) : status === 'playing' ? (
          <button
            onClick={handlePause}
            className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:scale-105 transition-transform shadow-lg"
            title="Pausar leitura"
          >
            <Pause size={24} />
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="w-12 h-12 flex items-center justify-center bg-emerald-500 text-white rounded-full hover:scale-105 transition-transform shadow-lg"
            title="Retomar leitura"
          >
            <Play size={24} className="ml-1" />
          </button>
        )}

        {status !== 'idle' && (
          <>
            <button
              onClick={handleStop}
              className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
              title="Parar leitura"
            >
              <Square size={18} fill="currentColor" />
            </button>
            <button
              onClick={handleRestart}
              className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 rounded-full hover:bg-primary/10 hover:text-primary transition-colors shadow-sm"
              title="Reiniciar do começo"
            >
              <RotateCcw size={18} />
            </button>
          </>
        )}
      </div>

      <div className="flex-1 text-center md:text-left">
        <p className="font-bold text-dark flex items-center justify-center md:justify-start gap-2 text-sm md:text-base">
          <Volume2 size={18} className="text-primary" />
          {status === 'playing' ? l.listening : status === 'paused' ? l.paused : l.listen}
        </p>
        <div className="flex items-center justify-center md:justify-start gap-2">
          <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">
            {l.accessibility}
          </p>
          {status === 'playing' && (
            <div className="flex gap-0.5">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 12, 4] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-primary rounded-full"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
