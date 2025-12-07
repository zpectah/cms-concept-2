export const classNames = (
  ...args: Array<string | string[] | undefined | null | false>
): string => args.flat().filter(Boolean).join(' ').trim();
