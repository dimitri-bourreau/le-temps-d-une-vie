import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

const SUPPORTED_LOCALES = ['fr', 'en'];

const detectLocaleFromHeader = (acceptLanguage: string | null): string => {
  if (!acceptLanguage) return 'fr';

  const languages = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0].trim().substring(0, 2));

  for (const lang of languages) {
    if (SUPPORTED_LOCALES.includes(lang)) {
      return lang;
    }
  }

  return 'fr';
};

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieLocale = cookieStore.get('locale')?.value;
  const acceptLanguage = headerStore.get('accept-language');

  const locale =
    cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)
      ? cookieLocale
      : detectLocaleFromHeader(acceptLanguage);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
