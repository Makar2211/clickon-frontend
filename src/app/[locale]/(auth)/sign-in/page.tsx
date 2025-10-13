'use client';
import { Button, Input, Label } from '@/components/ui';
import { LogInUser } from '@/features/auth/api';
import { LogInUserFields, ResponseLogInResult } from '@/types';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useActionState, useEffect, useState } from 'react';
interface Props {
  className?: string;
}

export default function SignInPage({ className }: Props) {
  const t = useTranslations('auth');
  const [state, formAction, pending] = useActionState<
    ResponseLogInResult | undefined,
    FormData
  >(LogInUser, undefined);
  const [values, setValues] = useState<LogInUserFields>({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (state?.data) {
      setValues(state.data);
    }
  }, [state?.data]);
  const [isView, setIsView] = useState(false);
  return (
    <form action={formAction} className="pt-6 px-8">
      <div>
        <Label>{t('email')}</Label>
        <Input
          name="email"
          type="text"
          className="mt-2"
          required
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        />
      </div>

      <div className="mt-4">
        <Label>{t('password')}</Label>
        <div className="relative">
          <Input
            name="password"
            type={isView ? 'text' : 'password'}
            placeholder="8+ characters"
            className="mt-0 "
            value={values.password}
            onChange={(e) =>
              setValues((v) => ({ ...v, password: e.target.value }))
            }
            required
          />
          {isView ? (
            <Eye
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setIsView(!isView)}
            />
          ) : (
            <EyeOff
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setIsView(!isView)}
            />
          )}
        </div>
      </div>
      <Button type="submit" className="w-full py-6 mt-8" disabled={pending}>
        <span>{t('signIn')}</span>
        <Image
          src="/general/arrowRight.svg"
          alt="Arrow Right"
          height={20}
          width={20}
        />
      </Button>
    </form>
  );
}
