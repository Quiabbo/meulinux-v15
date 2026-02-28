import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Meu Linux | Encontre, Baixe e Aprenda Tudo Sobre Distros Linux',
  description = 'Descubra o mundo Linux com o Meu Linux. Encontre as melhores distribuições, guias de instalação, tutoriais de pós-instalação e muito mais para iniciantes e avançados.',
  canonical,
  ogTitle,
  ogDescription,
  ogImage = 'https://meulinux.com.br/assets/images/meulinux-share-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
}) => {
  const siteTitle = title.includes('Meu Linux') ? title : `${title} - Meu Linux`;
  const currentUrl = canonical || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={ogTitle || siteTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={ogTitle || siteTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
