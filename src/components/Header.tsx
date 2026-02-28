import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import { DISTRO_LIST_NAMES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  pt: {
    home: 'Início',
    about: 'Sobre',
    content: 'Conteúdo',
    contact: 'Contato',
    light_mode: 'Modo Claro',
    dark_mode: 'Modo Escuro',
    close_menu: 'Fechar menu',
    open_menu: 'Abrir menu',
    portuguese: 'Português',
    english: 'Inglês',
    spanish: 'Espanhol'
  },
  en: {
    home: 'Home',
    about: 'About',
    content: 'Content',
    contact: 'Contact',
    light_mode: 'Light Mode',
    dark_mode: 'Dark Mode',
    close_menu: 'Close menu',
    open_menu: 'Open menu',
    portuguese: 'Portuguese',
    english: 'English',
    spanish: 'Spanish'
  },
  es: {
    home: 'Inicio',
    about: 'Sobre',
    content: 'Contenido',
    contact: 'Contacto',
    light_mode: 'Modo Claro',
    dark_mode: 'Modo Oscuro',
    close_menu: 'Cerrar menú',
    open_menu: 'Abrir menú',
    portuguese: 'Portugués',
    english: 'Inglés',
    spanish: 'Español'
  }
};

export const Header = () => {
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const t = translations[lang];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const filteredDistros = DISTRO_LIST_NAMES.filter(name => 
    name.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 5);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search) {
      navigate(`/?search=${search}`);
      setShowResults(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#202124] text-white z-50 h-20 flex items-center shadow-lg" role="banner">
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Meu Linux - Início">
          <img 
            src="https://meulinux.com.br/wp-content/uploads/2023/06/meu-10.gif" 
            alt="Meu Linux Logo" 
            className="h-8 w-auto"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-display font-normal text-sm" aria-label="Navegação principal">
          <Link to="/" className="hover:text-primary transition-colors">{t.home}</Link>
          <Link to="/sobre" className="hover:text-primary transition-colors">{t.about}</Link>
          <Link to="/conteudo" className="hover:text-primary transition-colors">{t.content}</Link>
          <Link to="/contato" className="hover:text-primary transition-colors">{t.contact}</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Selector */}
          <div className="relative group">
            {/* Desktop View: Horizontal Flags */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-[6px] border border-white/10">
              <button 
                onClick={() => setLang('pt')}
                className={`p-1.5 rounded-[4px] transition-all text-lg ${lang === 'pt' ? 'bg-white/20 scale-110' : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0'}`}
                title={t.portuguese}
                aria-label={`Mudar idioma para ${t.portuguese}`}
              >
                🇧🇷
              </button>
              <button 
                onClick={() => setLang('en')}
                className={`p-1.5 rounded-[4px] transition-all text-lg ${lang === 'en' ? 'bg-white/20 scale-110' : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0'}`}
                title={t.english}
                aria-label={`Change language to ${t.english}`}
              >
                🇺🇸
              </button>
              <button 
                onClick={() => setLang('es')}
                className={`p-1.5 rounded-[4px] transition-all text-lg ${lang === 'es' ? 'bg-white/20 scale-110' : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0'}`}
                title={t.spanish}
                aria-label={`Cambiar idioma a ${t.spanish}`}
              >
                🇪🇸
              </button>
            </div>

            {/* Mobile View: Dropdown */}
            <div className="md:hidden">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as 'pt' | 'en' | 'es')}
                className="bg-white/5 border border-white/10 rounded-[6px] p-2 text-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Selecionar idioma"
              >
                <option value="pt">🇧🇷</option>
                <option value="en">🇺🇸</option>
                <option value="es">🇪🇸</option>
              </select>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-white/10 rounded-[6px] transition-colors focus:ring-2 focus:ring-primary outline-none"
            aria-label={isDark ? t.light_mode : t.dark_mode}
            title={isDark ? t.light_mode : t.dark_mode}
          >
            {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>

          {/* DistroMatch Button */}
          <div className="hidden md:block">
            <Link 
              to="/distromatch" 
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-[6px] font-bold transition-all transform hover:scale-105 inline-block"
              aria-label="Ir para ferramenta Distro Match"
            >
              <span className="font-normal">Distro</span>Match
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2 focus:ring-2 focus:ring-primary outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t.close_menu : t.open_menu}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="absolute top-20 left-0 right-0 bg-[#202124] border-t border-white/10 p-4 md:hidden flex flex-col gap-4 font-display font-normal text-sm" aria-label="Menu móvel">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-2">{t.home}</Link>
          <Link to="/sobre" onClick={() => setIsMenuOpen(false)} className="py-2">{t.about}</Link>
          <Link to="/conteudo" onClick={() => setIsMenuOpen(false)} className="py-2">{t.content}</Link>
          <Link to="/contato" onClick={() => setIsMenuOpen(false)} className="py-2">{t.contact}</Link>
          <Link to="/distromatch" className="bg-primary text-center py-2 rounded-[6px] font-bold" onClick={() => setIsMenuOpen(false)}>
            <span className="font-normal">Distro</span>Match
          </Link>
        </nav>
      )}
    </header>
  );
};
