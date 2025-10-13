import z from 'zod';

export const createUserSchema = z
  .object({
    name: z.string().min(2, 'error.invalid_name'),
    email: z.email('error.invalid_email'),
    password: z.string().min(8, 'error.invalid_password'),
    confirmPassword: z.string().min(8, 'error.invalid_confirm_password'),
    checkbox: z.preprocess((val) => Boolean(val), z.boolean()),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'error.passwords_do_not_match',
        path: ['confirmPassword'],
      });
      return;
    }

    if (!data.checkbox) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'error.terms_must_be_accepted',
        path: ['checkbox'],
      });
    }
  });
