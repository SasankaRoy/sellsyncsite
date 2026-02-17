
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title,
  description,
  name = 'SellSync',
  type = 'website',
  image,
  url
}: SEOProps) {
  const defaultDescription = "Transform your retail operations with SellSync. Cloud-powered POS software with integrated hardware, built for speed, accuracy, and seamless retail operations across the USA.";
  const siteTitle = "SellSync POS - The Smarter POS System for Modern Retail";
  const metaDescription = description || defaultDescription;
  const pageTitle = title ? `${title} | ${name}` : siteTitle;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{pageTitle}</title>
      <meta name='description' content={metaDescription} />

      {/* Open Graph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
