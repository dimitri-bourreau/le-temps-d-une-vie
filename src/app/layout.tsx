import type { Metadata } from 'next';
import { Lora, Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { PageTransition } from '@/components/atoms/page-transition';
import { SiteHeader } from '@/components/molecules/site-header';
import { SiteFooter } from '@/components/molecules/site-footer';
import './globals.css';

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://letempsddunevie.fr'),
  title: "Le temps d'une vie",
  description:
    "Saurez-vous deviner l'espérance de vie de sept animaux de ferme ? Un quiz pour découvrir la réalité de l'élevage.",
  keywords: [
    'animaux',
    'élevage',
    'espérance de vie',
    'quiz',
    'bien-être animal',
    'ferme',
  ],
  authors: [{ name: 'Dimitri Bourreau', url: 'https://dimitribourreau.dev' }],
  creator: 'Dimitri Bourreau',
  openGraph: {
    title: "Le temps d'une vie",
    description:
      "Saurez-vous deviner l'espérance de vie de sept animaux de ferme ?",
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    siteName: "Le temps d'une vie",
    images: [
      {
        url: '/images/male-chick.jpg',
        width: 1024,
        height: 1024,
        alt: "Poussin - Le temps d'une vie",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Le temps d'une vie",
    description:
      "Saurez-vous deviner l'espérance de vie de sept animaux de ferme ?",
    images: ['/images/male-chick.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${lora.variable} ${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <NuqsAdapter>
            <SiteHeader />
            <PageTransition>{children}</PageTransition>
            <SiteFooter />
          </NuqsAdapter>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
