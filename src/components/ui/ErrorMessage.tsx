'use client';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  className?: string;
  message?: string | null;
}

const ErrorMessage: React.FC<Props> = ({ className, message }) => {
  const t = useTranslations();
  if (!message) return null;

  return (
    <p className={cn('text-red-500 text-sm mt-1', className)}>{t(message)}</p>
  );
};

export default ErrorMessage;
