import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  email: z.string().email().toLowerCase().trim(),
  phone: z.string().regex(/^[0-9]{10,15}$/),
  password: z.string().min(6).max(100),
});

export const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1),
});

export const updateSchema = z.object({
  name: z.string().min(2).max(50).trim().optional(),
  phone: z.string().regex(/^[0-9]{10,15}$/).optional(),
  password: z.string().min(6).max(100).optional(),
});
