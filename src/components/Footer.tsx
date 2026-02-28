import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  pt: {
    tagline: "Simplificando o acesso a diversas distros Linux desde 2020. Encontre a sua liberdade digital aqui.",
    usefulLinks: "Links Úteis",
    about: "Sobre",
    contact: "Contato",
    terms: "Termos de Uso",
    privacy: "Política de Privacidade",
    followUs: "Siga-nos",
    license: "Licença: Creative Commons Attribution 4.0 International License Meu Linux. A marca registrada Linux® é usado de acordo com um sublicenciamento da Linux Foundation, o licenciado exclusivo de Linus Torvalds, proprietário da marca em todo o mundo.",
    createdBy: "Criado por Filipi Hadji"
  },
  en: {
    tagline: "Simplifying access to various Linux distros since 2020. Find your digital freedom here.",
    usefulLinks: "Useful Links",
    about: "About",
    contact: "Contact",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    followUs: "Follow Us",
    license: "License: Creative Commons Attribution 4.0 International License Meu Linux. The Linux® trademark is used pursuant to a sublicense from the Linux Foundation, the exclusive licensee of Linus Torvalds, owner of the mark on a worldwide basis.",
    createdBy: "Created by Filipi Hadji"
  },
  es: {
    tagline: "Simplificando el acceso a diversas distros Linux desde 2020. Encuentra tu libertad digital aquí.",
    usefulLinks: "Enlaces Útiles",
    about: "Sobre",
    contact: "Contacto",
    terms: "Términos de Uso",
    privacy: "Política de Privacidad",
    followUs: "Síguenos",
    license: "Licencia: Creative Commons Attribution 4.0 International License Meu Linux. La marca registrada Linux® se utiliza de acuerdo con una sublicencia de la Linux Foundation, el licenciatario exclusivo de Linus Torvalds, propietario de la marca en todo el mundo.",
    createdBy: "Creado por Filipi Hadji"
  }
};

export const Footer = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <footer className="bg-dark text-white py-12" role="contentinfo">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4" aria-label="Meu Linux - Início">
              <img 
                src="https://meulinux.com.br/wp-content/uploads/2023/06/meu-10.gif" 
                alt="Meu Linux Logo" 
                className="h-8 w-auto"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-white/60 max-w-sm">
              {t.tagline}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Links do rodapé">
            <h4 className="font-bold mb-4">{t.usefulLinks}</h4>
            <ul className="space-y-2 text-white/60">
              <li><Link to="/sobre" className="hover:text-primary transition-colors">{t.about}</Link></li>
              <li><Link to="/contato" className="hover:text-primary transition-colors">{t.contact}</Link></li>
              <li><Link to="/termos" className="hover:text-primary transition-colors">{t.terms}</Link></li>
              <li><Link to="/privacidade" className="hover:text-primary transition-colors">{t.privacy}</Link></li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/10 pt-8 text-sm text-white/40 text-center">
          <p className="mb-4">
            {t.license}
          </p>
          <p>© 2020 meuLinux - {t.createdBy}</p>
        </div>
      </div>
    </footer>
  );
};
