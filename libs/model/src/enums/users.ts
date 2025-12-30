export const usersTypeKeys = {
  default: 'default',
} as const;

export const usersAccessKeys: Record<
  'none' | 'redactor' | 'manager' | 'admin',
  number
> = {
  none: 0,
  redactor: 3,
  manager: 5,
  admin: 7,
} as const;
