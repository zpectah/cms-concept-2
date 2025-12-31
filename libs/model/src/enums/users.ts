export const usersTypeKeys = {
  default: 'default',
} as const;

export const userAccessNamesKeys = {
  none: 'none',
  redactor: 'redactor',
  manager: 'manager',
  admin: 'admin',
} as const;

export const usersAccessKeys: Record<keyof typeof userAccessNamesKeys, number> =
  {
    [userAccessNamesKeys.none]: 0,
    [userAccessNamesKeys.redactor]: 3,
    [userAccessNamesKeys.manager]: 5,
    [userAccessNamesKeys.admin]: 7,
  } as const;
