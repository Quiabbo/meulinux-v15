import React, { useEffect, useRef, useState } from 'react';
import { Play, Square, RotateCcw, Maximize, Keyboard, KeyboardOff, AlertCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface V86EmulatorProps {
  isoUrl: string;
  onClose: () => void;
}

declare global {
  interface Window {
    V86Starter: any;
  }
}

export const V86Emulator: React.FC<V86EmulatorProps> = ({ isoUrl, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const emulatorRef = useRef<any>(null);
  
  const [status, setStatus] = useState<'ready' | 'downloading' | 'initializing' | 'running' | 'error'>('ready');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isKeyboardCaptured, setIsKeyboardCaptured] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [memorySize, setMemorySize] = useState(512 * 1024 * 1024); // 512MB

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-19), `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  const loadV86Script = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.V86Starter || (window as any).V86) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://copy.sh/v86/build/v86_all.js';
      script.async = true;
      script.onload = () => {
        addLog('script loaded ok');
        addLog(`typeof window.V86Starter: ${typeof window.V86Starter}`);
        addLog(`typeof window.V86: ${typeof (window as any).V86}`);

        if (window.V86Starter || (window as any).V86) {
          resolve();
        } else {
          const v86Keys = Object.keys(window).filter(k => k.toLowerCase().includes("v86"));
          reject(new Error(`V86Starter ou V86 não encontrados no escopo global. Chaves relacionadas encontradas: ${v86Keys.join(', ') || 'nenhuma'}.`));
        }
      };
      script.onerror = () => reject(new Error('Falha ao carregar o script do emulador em https://copy.sh/v86/build/v86_all.js.'));
      document.head.appendChild(script);
    });
  };

  const startEmulator = async (memSize = 512 * 1024 * 1024) => {
    try {
      setError(null);
      setStatus('downloading');
      addLog(`Iniciando carregamento (Memória: ${memSize / (1024 * 1024)}MB)...`);

      // 1. Load Script
      await loadV86Script();
      addLog('Script v86 pronto para uso.');

      // 2. Download ISO with progress
      addLog(`Baixando ISO: ${isoUrl}`);
      
      let response;
      try {
        // Usar apenas GET conforme solicitado, sem HEAD e sem no-cors
        response = await fetch(isoUrl, { method: 'GET', cache: 'no-store' });
        addLog(`Status do GET: ${response.status} ${response.statusText}`);
        
        const acceptRanges = response.headers.get('accept-ranges');
        if (acceptRanges) {
          addLog(`Servidor suporta Range Requests: ${acceptRanges}`);
        }

        const contentLength = response.headers.get('content-length');
        if (contentLength) {
          addLog(`Tamanho do arquivo: ${(parseInt(contentLength, 10) / (1024 * 1024)).toFixed(2)} MB`);
        }
      } catch (fetchErr: any) {
        addLog(`Falha total na rede ao acessar a ISO.`);
        throw new Error(`Erro de rede ao baixar a ISO: ${fetchErr.message}. Verifique sua conexão.`);
      }

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Arquivo não encontrado (404). Confirme o caminho exato e o nome do arquivo (case-sensitive). URL: ${isoUrl}`);
        }
        throw new Error(`Falha ao baixar ISO. Status: ${response.status}. URL: ${isoUrl}`);
      }

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      let loaded = 0;

      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          loaded += value.length;
          if (total) {
            setProgress(Math.round((loaded / total) * 100));
          }
        }
      }

      const blob = new Blob(chunks);
      const blobUrl = URL.createObjectURL(blob);
      addLog('ISO baixada com sucesso.');

      // 3. Initialize Emulator
      setStatus('initializing');
      addLog('Inicializando v86...');

      const settings = {
        wasm_path: 'https://meulinux.com.br/assets/v86/v86.wasm',
        screen_container: screenRef.current,
        cdrom: { url: blobUrl },
        memory_size: memSize,
        vga_memory_size: 8 * 1024 * 1024,
        autostart: true,
      };

      // Detect constructor
      const V86Constructor = window.V86Starter || (window as any).V86;
      if (!V86Constructor) {
        throw new Error('Construtor v86 não encontrado no momento da inicialização.');
      }

      emulatorRef.current = new V86Constructor(settings);
      
      emulatorRef.current.add_listener('emulator-ready', () => {
        setStatus('running');
        addLog('Emulador pronto e rodando.');
      });

      emulatorRef.current.add_listener('download-error', (e: any) => {
        addLog(`Erro de download do WASM: ${e}`);
        if (memSize > 256 * 1024 * 1024) {
          addLog('Tentando novamente com menos memória (256MB)...');
          stopEmulator();
          startEmulator(256 * 1024 * 1024);
        } else {
          setError(`Erro ao carregar o arquivo WASM em https://meulinux.com.br/assets/v86/v86.wasm.`);
          setStatus('error');
        }
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ocorreu um erro inesperado na inicialização.');
      setStatus('error');
      addLog(`ERRO: ${err.message}`);
    }
  };

  const stopEmulator = () => {
    if (emulatorRef.current) {
      emulatorRef.current.destroy();
      emulatorRef.current = null;
    }
    setStatus('ready');
    setProgress(0);
    setIsKeyboardCaptured(false);
    addLog('Emulador parado.');
  };

  const restartEmulator = () => {
    stopEmulator();
    startEmulator();
  };

  const toggleFullscreen = () => {
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  const captureKeyboard = () => {
    if (emulatorRef.current) {
      emulatorRef.current.keyboard_set_status(true);
      setIsKeyboardCaptured(true);
      addLog('Teclado capturado.');
    }
  };

  const releaseKeyboard = () => {
    if (emulatorRef.current) {
      emulatorRef.current.keyboard_set_status(false);
      setIsKeyboardCaptured(false);
      addLog('Teclado solto.');
    }
  };

  useEffect(() => {
    startEmulator();
    return () => {
      stopEmulator();
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 my-8"
      ref={containerRef}
    >
      <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            TinyCore Linux no navegador <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">Beta</span>
          </h3>
          <p className="text-sm text-gray-400">Ambiente demonstrativo com interface gráfica. Primeiro carregamento pode demorar.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {status === 'running' ? (
            <>
              <button 
                onClick={stopEmulator}
                className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
                aria-label="Parar emulador"
              >
                <Square size={16} /> Parar
              </button>
              <button 
                onClick={restartEmulator}
                className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
                aria-label="Reiniciar emulador"
              >
                <RotateCcw size={16} /> Reiniciar
              </button>
            </>
          ) : status === 'error' ? (
            <button 
              onClick={startEmulator}
              className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
            >
              <RotateCcw size={16} /> Tentar novamente
            </button>
          ) : null}
          
          <button 
            onClick={toggleFullscreen}
            className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
            aria-label="Tela cheia"
          >
            <Maximize size={16} /> Tela cheia
          </button>
          
          <button 
            onClick={onClose}
            className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold transition-all"
            aria-label="Fechar painel"
          >
            Fechar
          </button>
        </div>
      </div>

      <div className="relative bg-black min-h-[400px] md:min-h-[650px] flex items-center justify-center overflow-hidden">
        {/* Emulator Screen */}
        <div 
          ref={screenRef} 
          className={`w-full h-full flex items-center justify-center ${status === 'running' ? 'opacity-100' : 'opacity-0'}`}
          style={{ whiteSpace: 'pre', font: '14px monospace', lineHeight: '14px' }}
        />

        {/* Status Overlays */}
        <AnimatePresence>
          {(status === 'downloading' || status === 'initializing') && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 p-8 text-center"
            >
              <Loader2 className="text-primary animate-spin mb-4" size={48} />
              <h4 className="text-xl font-bold text-white mb-2">
                {status === 'downloading' ? `Baixando ISO... ${progress}%` : 'Inicializando sistema...'}
              </h4>
              <div className="w-full max-w-md bg-white/10 h-2 rounded-full overflow-hidden mb-4">
                <motion.div 
                  className="bg-primary h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-gray-400 text-sm">O TinyCore Linux está sendo carregado diretamente na memória do seu navegador.</p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 p-8 text-center"
            >
              <AlertCircle className="text-red-500 mb-4" size={48} />
              <h4 className="text-xl font-bold text-white mb-2">Erro ao iniciar emulador</h4>
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl max-w-md mb-6">
                <p className="text-red-400 text-sm mb-2"><strong>URL:</strong> {isoUrl}</p>
                <p className="text-red-400 text-sm"><strong>Mensagem:</strong> {error}</p>
              </div>
              <p className="text-gray-500 text-xs mb-4">Veja o accordion "Detalhes técnicos" abaixo para logs de rede e diagnóstico.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Warning */}
        <div className="absolute bottom-4 left-4 right-4 md:hidden bg-yellow-500/20 border border-yellow-500/50 p-2 rounded text-[10px] text-yellow-200 text-center z-30">
          Melhor experiência em modo paisagem ou desktop. Pode ser lento em celulares.
        </div>
      </div>

      <div className="p-4 bg-gray-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {!isKeyboardCaptured ? (
            <button 
              onClick={captureKeyboard}
              disabled={status !== 'running'}
              className="bg-primary text-white disabled:opacity-50 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
              aria-label="Capturar teclado"
            >
              <Keyboard size={16} /> Capturar teclado
            </button>
          ) : (
            <button 
              onClick={releaseKeyboard}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all animate-pulse"
              aria-label="Soltar teclado"
            >
              <KeyboardOff size={16} /> Soltar teclado (ESC)
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${status === 'running' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-500'}`} />
            Status: {status === 'ready' ? 'Pronto' : status === 'downloading' ? 'Baixando...' : status === 'initializing' ? 'Iniciando...' : status === 'running' ? 'Rodando' : 'Erro'}
          </span>
          <span className="hidden sm:inline">Não salva alterações ao recarregar.</span>
        </div>
      </div>

      {/* Tech Details Accordion */}
      <div className="border-t border-white/10">
        <button 
          onClick={() => setShowTechDetails(!showTechDetails)}
          className="w-full p-4 flex items-center justify-between text-xs text-gray-500 hover:bg-white/5 transition-colors"
        >
          <span>Detalhes técnicos e logs</span>
          {showTechDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        
        <AnimatePresence>
          {showTechDetails && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden bg-black/50"
            >
              <div className="p-4 font-mono text-[10px] text-gray-400 max-h-40 overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="mb-1">{log}</div>
                ))}
                {logs.length === 0 && <div>Nenhum log disponível.</div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
