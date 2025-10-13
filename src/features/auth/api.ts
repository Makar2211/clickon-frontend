'use server';

import {
  CreateUserFields,
  ResponseLogInResult,
  ResponseUserResult,
} from '@/types';
import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { createUserSchema } from './model';

export async function createUser(
  _prevState?: ResponseUserResult,
  formData?: FormData,
): Promise<ResponseUserResult> {
  const locale = await getLocale();
  const getString = (k: string) => String(formData?.get(k) ?? '');
  const getBool = (k: string) => Boolean(formData?.get(k));

  const validatedFields = createUserSchema.safeParse({
    name: getString('name'),
    email: getString('email'),
    password: getString('password'),
    confirmPassword: getString('confirmPassword'),
    checkbox: getBool('checkbox'),
  });

  if (!validatedFields.success) {
    const formFieldErrors = validatedFields.error.flatten()
      .fieldErrors as Record<keyof CreateUserFields, string[] | undefined>;

    const values = {
      name: getString('name'),
      email: getString('email'),
      password: getString('password'),
      confirmPassword: getString('confirmPassword'),
      checkbox: getBool('checkbox'),
    };

    return {
      errors: {
        name: formFieldErrors?.name,
        email: formFieldErrors?.email,
        password: formFieldErrors?.password,
        confirmPassword: formFieldErrors?.confirmPassword,
        checkbox: formFieldErrors?.checkbox,
      },
      values,
    };
  }

  redirect(`/${locale}/`);
}

export async function LogInUser(
  _prevState?: ResponseLogInResult,
  formData?: FormData,
): Promise<ResponseLogInResult | undefined> {
  const locale = await getLocale();
  try {
    const data = {
      email: String(formData?.get('email') ?? ''),
      password: String(formData?.get('password') ?? ''),
    };

    console.log(data);

    const response = {
      error: true,
    };
    if (response.error) {
      return {
        error: 'error',
        data,
      };
    }

    redirect(`/${locale}/`);
  } catch (error) {
    console.log(error);
  }
}
