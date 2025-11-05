import { Helmet } from 'react-helmet-async';

function SEOHelmet({
  title,
  description,
  keywords,
  ogImage,
  url,
  type = 'website'
}) {
  const siteName = 'MoonGift.uz';
  const fullTitle = title ? `${title} - ${siteName}` : `${siteName} - Lazer texnologiyasi bilan yaratilgan noyob sovg'alar`;
  const defaultDescription = "MoonGift - yog'och va boshqa materiallarga lazer ishlov berish orqali noyob sovg'alar, individual dizaynlar va maxsus buyurtmalarni tayyorlash. O'zbekistonda eng sifatli lazer gravüra xizmatlari.";
  const defaultKeywords = "MoonGift, lazer gravüra, yog'ochga rasm chizish, sovg'alar, individual dizayn, maxsus buyurtma, Toshkent, O'zbekiston";
  const defaultOgImage = 'https://moongift.uz/og-image.jpg';
  const fullUrl = url ? `https://moongift.uz${url}` : 'https://moongift.uz';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={ogImage || defaultOgImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}

export default SEOHelmet;
