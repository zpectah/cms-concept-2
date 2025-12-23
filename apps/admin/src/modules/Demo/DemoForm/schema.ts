import z from 'zod';

export const demoFormSchema = z.object({
  inputText: z.string(),
  inputEmail: z.string(),
});
