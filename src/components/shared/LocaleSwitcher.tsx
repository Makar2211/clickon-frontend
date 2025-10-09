'use client';
import { useLocale, useTranslations } from 'next-intl';

import { locales } from '@/constants';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Locale } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '../ui/index';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale as Locale },
      );
    });
  }

  return (
    <Select value={locale} onValueChange={onSelectChange}>
      <SelectTrigger
        value={locale}
        className="shadow-none border-0 bg-transparent p-0"
      >
        <span className="uppercase font-medium text-sm">{locale}</span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {locales.map((cur) => (
            <SelectItem
              colorIcon={
                cur.code === locale ? 'text-[var(--primary-orange)]' : ''
              }
              className={
                cur.code === locale
                  ? '!text-[var(--primary-orange)] hover:!text-[var(--primary-orange)] focus:!text-[var(--primary-orange)]'
                  : ''
              }
              disabled={isPending}
              key={cur.code}
              value={cur.code}
            >
              <Image
                src={cur.icon}
                alt={cur.code}
                width={20}
                height={20}
                className="rounded-full w-5 h-5 object-cover"
              />
              {t(cur.label)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
