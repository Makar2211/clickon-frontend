import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin('./src/lib/i18nRequest.ts');

export default withNextIntl(nextConfig);
