import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must be at least 1 character' })
    .max(32, { message: 'Name must be at most 32 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  username: z
    .string()
    .min(1, { message: 'Username must be at least 1 character' })
    .max(1000, { message: 'Username must be at most 1000 characters' }),
});