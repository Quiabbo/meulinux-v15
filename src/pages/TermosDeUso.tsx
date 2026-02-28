import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { useLanguage } from '../contexts/LanguageContext';
import { AudioReader } from '../components/AudioReader';

const translations = {
  pt: {
    title: "Termos de Uso",
    lastUpdate: "Última atualização: Fevereiro de 2026",
    content: `
      1. Aceitação dos Termos
      Ao acessar e usar o portal Meu Linux, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nosso site.

      2. Uso do Site
      O Meu Linux é um portal informativo sobre distribuições Linux. O conteúdo é fornecido para fins informativos e educacionais. Você concorda em usar o site apenas para fins lícitos.

      3. Propriedade Intelectual
      Todo o conteúdo original do Meu Linux (textos, design, logotipos) é de propriedade de Filipi Hadji, a menos que indicado de outra forma. A marca registrada Linux® é usada de acordo com um sublicenciamento da Linux Foundation.

      4. Links para Terceiros
      Nosso site contém links para sites externos (como sites oficiais de distribuições). Não temos controle sobre o conteúdo ou práticas desses sites e não assumimos responsabilidade por eles.

      5. Isenção de Responsabilidade
      Embora nos esforcemos para manter as informações precisas e atualizadas, o Meu Linux não oferece garantias de qualquer tipo sobre a integridade, precisão ou confiabilidade das informações contidas no site.

      6. Alterações nos Termos
      Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site.
    `
  },
  en: {
    title: "Terms of Use",
    lastUpdate: "Last updated: February 2026",
    content: `
      1. Acceptance of Terms
      By accessing and using the Meu Linux portal, you agree to comply with and be bound by the following terms and conditions of use. If you do not agree with any part of these terms, you should not use our site.

      2. Use of the Site
      Meu Linux is an information portal about Linux distributions. The content is provided for informational and educational purposes. You agree to use the site only for lawful purposes.

      3. Intellectual Property
      All original content on Meu Linux (text, design, logos) is owned by Filipi Hadji unless otherwise indicated. The Linux® trademark is used pursuant to a sublicense from the Linux Foundation.

      4. Third-Party Links
      Our site contains links to external sites (such as official distribution sites). We have no control over the content or practices of these sites and assume no responsibility for them.

      5. Disclaimer
      While we strive to keep information accurate and up-to-date, Meu Linux makes no warranties of any kind about the completeness, accuracy, or reliability of the information contained on the site.

      6. Changes to Terms
      We reserve the right to modify these terms at any time. Changes will take effect immediately upon posting on the site.
    `
  },
  es: {
    title: "Términos de Uso",
    lastUpdate: "Última actualización: Febrero de 2026",
    content: `
      1. Aceptación de los Términos
      Al acceder y utilizar el portal Meu Linux, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio.

      2. Uso del Sitio
      Meu Linux es un portal informativo sobre distribuciones Linux. El contenido se proporciona con fines informativos y educativos. Usted acepta utilizar el sitio únicamente para fines lícitos.

      3. Propiedad Intelectual
      Todo el contenido original de Meu Linux (textos, diseño, logotipos) es propiedad de Filipi Hadji, a menos que se indique lo contrario. La marca registrada Linux® se utiliza de acuerdo con una sublicencia de la Linux Foundation.

      4. Enlaces a Terceros
      Nuestro sitio contiene enlaces a sitios externos (como sitios oficiales de distribuciones). No tenemos control sobre el contenido o las prácticas de estos sitios y no asumimos responsabilidad por ellos.

      5. Exención de Responsabilidade
      Aunque nos esforzamos por mantener la información precisa y actualizada, Meu Linux no ofrece garantías de ningún tipo sobre la integridad, precisión o confiabilidad de la información contenida en el sitio.

      6. Cambios en los Términos
      Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.
    `
  }
};

export const TermosDeUso = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title={`${t.title} | Meu Linux`}
        description="Leia os termos de uso do portal Meu Linux."
        canonical="https://meulinux.com.br/termos"
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
