export type CreateUserFields = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  checkbox: boolean;
};

export type CreateUserErrors = Partial<{
  name: string[];
  email: string[];
  password: string[];
  confirmPassword: string[];
  checkbox: string[];
}>;

export type LogInUserFields = {
  email: string;
  password: string;
};

export type LogInUserErrors = {
  email: string[];
  password: string[];
};

export type ResponseUserResult = {
  errors?: CreateUserErrors;
  values?: CreateUserFields;
};

export type ResponseLogInResult = {
  error?: string;
  data?: LogInUserFields;
};
