'use client';

import { Container } from '@/components/shared';
import { Button, Tabs, TabsList, TabsTrigger } from '@/components/ui';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('auth');
  const pathname = usePathname() || '';
  const params = useParams() as { locale?: string };
  const locale = params?.locale ?? 'en';

  const value = pathname.endsWith('/sign-up') ? 'signup' : 'signin';

  return (
    <Container className="max-w-[474px] mx-auto my-20 shadow-md ">
      <Tabs value={value} className="w-[474px]">
        <TabsList className="w-full p-0 border-none rounded-none">
          <TabsTrigger
            value="signin"
            asChild
            className="rounded-none bg-white data-[state=active]:!border-b-3 border-0 !border-[var(--primary-orange)]"
          >
            <Link href={`/${locale}/sign-in`} className="px-4 py-2">
              {t('signIn')}
            </Link>
          </TabsTrigger>

          <TabsTrigger
            value="signup"
            asChild
            className="rounded-none bg-white data-[state=active]:!border-b-3 border-0 !border-[var(--primary-orange)]"
          >
            <Link href={`/${locale}/sign-up`} className="px-4 py-2">
              {t('signUp')}
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <>{children}</>

      <div className="pb-6 px-8">
        <div className="flex items-center mt-6">
          <hr className="flex-1 border-t border-gray-300" />
          <span className="mx-4 text-sm text-gray-500">or</span>
          <hr className="flex-1 border-t border-gray-300" />
        </div>

        <Button
          type="submit"
          variant="white"
          className="w-full py-6 mt-3 relative"
        >
          <Image
            src="/general/google.svg"
            alt="Google"
            height={20}
            width={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
          />
          <span>{t('signInWithGoogle')}</span>
        </Button>

        <Button
          type="submit"
          variant="white"
          className="w-full py-6 mt-3 relative"
        >
          <Image
            src="/general/apple.svg"
            alt="Apple"
            height={20}
            width={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
          />
          <span>{t('signInWithApple')}</span>
        </Button>
      </div>
    </Container>
  );
}
