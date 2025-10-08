'use client';
import { socials } from '@/constants';
import { cn } from '@/lib/utils';
import { Heart, Search, ShoppingCart, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Container, CurrencySwitcher, LocaleSwitcher } from '../shared';
import { Badge, Input } from '../ui';

interface Props {
  className?: string;
}

const Header: React.FC<Props> = ({ className }) => {
  const t = useTranslations('input');
  return (
    <header className={cn(className, 'bg-[var(--primary-blue)]')}>
      <div className="bg-[var(--primary-blue)] h-13 border-b border-white/20  ">
        <Container className="flex items-center justify-between h-full">
          <h2 className="text-white">
            Welcome to Clicon online eCommerce store.
          </h2>
          <div className="flex items-center gap-2 text-white">
            <div className="flex items-center">
              <span className="text-sm">Follow us:</span>
              <div className="flex items-center">
                {socials.map((social) => (
                  <Link
                    key={social.title}
                    href={social.link}
                    className="inline-block p-2"
                  >
                    <Image
                      src={social.icon}
                      alt={social.title}
                      width={16}
                      height={16}
                    />
                  </Link>
                ))}
              </div>
            </div>

            <span>|</span>

            <LocaleSwitcher />

            <CurrencySwitcher />
          </div>
        </Container>
      </div>
      <div className="bg-[var(--primary-blue)] h-[88px]">
        <Container className="flex items-center h-full justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={177} height={48} />
          </Link>
          <div className="relative w-[650px] h-12 bg-white">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-black w-5 h-5 cursor-pointer" />
            <Input
              placeholder={t('headerSearch')}
              className="w-full h-full bg-white border-0 rounded-none focus-visible:none"
            />
          </div>

          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative">
              <ShoppingCart className="text-white" />
              <Badge className="absolute top-[-4px] right-[-5px] bg-white text-[var(--primary-blue)] h-4 min-w-4 rounded-full px-1 font-mono tabular-nums">
                0
              </Badge>
            </Link>
            <Link href="/favorites" className="relative ">
              <Heart className="text-white" />
              <Badge className="absolute top-[-4px] right-[-5px] bg-white text-[var(--primary-blue)] h-4 min-w-4 rounded-full px-1 font-mono tabular-nums">
                0
              </Badge>
            </Link>
            <Link href="/profile" className="relative">
              <UserRound className="text-white" />
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
