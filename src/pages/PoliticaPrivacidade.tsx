import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { useLanguage } from '../contexts/LanguageContext';
import { AudioReader } from '../components/AudioReader';

const translations = {
  pt: {
    title: "Política de Privacidade",
    lastUpdate: "Última atualização: Fevereiro de 2026",
    content: `
      1. Coleta de Informações
      O Meu Linux não coleta informações de identificação pessoal de seus visitantes, a menos que você as forneça voluntariamente através de nossos formulários de contato.

      2. Cookies
      Utilizamos cookies para melhorar sua experiência de navegação e analisar o tráfego do site. Você pode optar por desativar os cookies nas configurações do seu navegador.

      3. Uso de Dados
      As informações enviadas através do formulário de contato são utilizadas exclusivamente para responder às suas solicitações ou processar suas sugestões de distribuições.

      4. Proteção de Dados
      Implementamos medidas de segurança para proteger suas informações. No entanto, nenhum método de transmissão pela Internet é 100% seguro.

      5. Serviços de Terceiros
      Podemos utilizar serviços de terceiros (como Google Analytics) que coletam, monitoram e analisam dados de tráfego de forma anônima para nos ajudar a melhorar o portal.

      6. Contato
      Se você tiver dúvidas sobre esta política, entre em contato conosco através da nossa página de contato.
    `
  },
  en: {
    title: "Privacy Policy",
    lastUpdate: "Last updated: February 2026",
    content: `
      1. Information Collection
      Meu Linux does not collect personally identifiable information from its visitors unless you voluntarily provide it through our contact forms.

      2. Cookies
      We use cookies to improve your browsing experience and analyze site traffic. You can choose to disable cookies in your browser settings.

      3. Use of Data
      Information sent through the contact form is used exclusively to respond to your requests or process your distribution suggestions.

      4. Data Protection
      We implement security measures to protect your information. However, no method of transmission over the Internet is 100% secure.

      5. Third-Party Services
      We may use third-party services (such as Google Analytics) that collect, monitor, and analyze traffic data anonymously to help us improve the portal.

      6. Contact
      If you have questions about this policy, please contact us through our contact page.
    `
  },
  es: {
    title: "Política de Privacidad",
    lastUpdate: "Última actualización: Febrero de 2026",
    content: `
      1. Recopilación de Información
      Meu Linux no recopila información de identificación personal de sus visitantes a menos que usted la proporcione voluntariamente a través de nuestros formularios de contacto.

      2. Cookies
      Utilizamos cookies para mejorar su experiencia de navegación y analizar el tráfico del sitio. Puede optar por desactivar las cookies en la configuración de su navegador.

      3. Uso de Datos
      La información enviada a través del formulario de contacto se utiliza exclusivamente para responder a sus solicitudes o procesar sus sugerencias de distribuciones.

      4. Protección de Datos
      Implementamos medidas de seguridad para proteger su información. Sin embargo, ningún método de transmisión por Internet é 100% seguro.

      5. Servicios de Terceros
      Podemos utilizar servicios de terceros (como Google Analytics) que recopilan, monitorean y analizan datos de tráfico de forma anónima para ayudarnos a mejorar el portal.

      6. Contacto
      Si tiene preguntas sobre esta política, contáctenos a través de nuestra página de contacto.
    `
  }
};

export const PoliticaPrivacidade = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title={`${t.title} | Meu Linux`}
        description="Leia a política de privacidade do portal Meu Linux."
        canonical="https://meulinux.com.br/privacidade"
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
          <p className="text-white/60">{t.lastUpdate}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl">
          <AudioReader text={t.content} />
          <div className="prose prose-lg max-w-none">
            {t.content.split('\n').map((line, i) => {
              const trimmedLine = line.trim();
              if (/^\d+\./.test(trimmedLine)) {
                return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{trimmedLine}</h2>;
              }
              return <p key={i} className="mb-4 text-gray-700">{line}</p>;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
