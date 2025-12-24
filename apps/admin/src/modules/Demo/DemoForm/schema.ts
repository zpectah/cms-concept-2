import z from 'zod';

export const demoFormSchema = z.object({
  inputText: z.string(),
  inputEmail: z.string(),
  selectString: z.string(),
  selectNumber: z.number(),
  /* TODO */
});
