'use client';
import { Button, Checkbox, ErrorMessage, Input, Label } from '@/components/ui';
import { createUser } from '@/features/auth/api';
import { cn } from '@/lib/utils';
import { CreateUserFields } from '@/types';
import { Eye, EyeOff } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';

interface Props {
  className?: string;
}

const initialState = {
  errors: {
    name: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  },
  success: undefined,
};

export default function SignUpPage({ className }: Props) {
  const t = useTranslations('auth');
  const location = useLocale();
  const [state, formAction, pending] = useActionState(createUser, initialState);
  const [values, setValues] = useState<CreateUserFields>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    checkbox: false,
  });
  const [isView, setIsView] = useState(false);
  const [isConfirmView, setIsConfirmView] = useState(false);

  useEffect(() => {
    if (state?.values) {
      setValues(state.values);
    }
  }, [state?.values]);

  return (
    <form className={cn('pt-6 px-8', className)} action={formAction}>
      <div>
        <Label>{t('name')}</Label>
        <Input
          name="name"
          type="text"
          className="mt-2"
          required
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        />
        {state.errors?.name && <ErrorMessage message={state.errors.name[0]} />}
      </div>

      <div className="mt-4">
        <Label>{t('email')}</Label>
        <Input
          name="email"
          type="email"
          className="mt-2"
          required
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        />
        {state.errors?.email && (
          <ErrorMessage message={state.errors.email[0]} />
        )}
      </div>

      <div className="mt-4">
        <Label className="mb-2">{t('password')}</Label>
        <div className="relative">
          <Input
            name="password"
            type={isView ? 'text' : 'password'}
            placeholder="8+ characters"
            className="mt-0"
            required
            value={values.password}
            onChange={(e) =>
              setValues((v) => ({ ...v, password: e.target.value }))
            }
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

        {state.errors?.password && (
          <ErrorMessage message={state.errors.password[0]} />
        )}
      </div>

      <div className="mt-4">
        <Label>{t('confirmPassword')}</Label>
        <div className="relative">
          <Input
            name="confirmPassword"
            type={isConfirmView ? 'text' : 'password'}
            placeholder="8+ characters"
            className="mt-0"
            required
            value={values.confirmPassword}
            onChange={(e) =>
              setValues((v) => ({ ...v, confirmPassword: e.target.value }))
            }
          />
          {isConfirmView ? (
            <Eye
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setIsConfirmView(!isConfirmView)}
            />
          ) : (
            <EyeOff
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setIsConfirmView(!isConfirmView)}
            />
          )}
        </div>

        {state.errors?.confirmPassword && (
          <ErrorMessage message={state.errors.confirmPassword[0]} />
        )}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Checkbox
          id="terms"
          name="checkbox"
          checked={values.checkbox}
          onCheckedChange={(checked) =>
            setValues((v) => ({ ...v, checkbox: Boolean(checked) }))
          }
        />
        <Label htmlFor="terms" className="gap-1">
          Are you agree to
          <Link
            href={`/${location}/terms`}
            className="text-[var(--primary-blue)]"
          >
            Terms of Condition
          </Link>
          and
          <Link
            href={`/${location}/privacy`}
            className="text-[var(--primary-blue)]"
          >
            Privacy Policy.
          </Link>
        </Label>
      </div>
      {state.errors?.checkbox && (
        <ErrorMessage message={state.errors.checkbox[0]} />
      )}
      <Button disabled={pending} type="submit" className="w-full py-6 mt-8">
        <span>{t('signUp')}</span>
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
