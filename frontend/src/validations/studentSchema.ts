import { z } from 'zod';

export const studentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(50, 'Email must not exceed 50 characters'),
  
  grade: z
    .string()
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 1 && num <= 12;
    }, 'Grade must be between 1 and 12'),
  
  age: z
    .number()
    .min(5, 'Age must be at least 5')
    .max(100, 'Age must not exceed 100')
    .int('Age must be a whole number'),
});

export type StudentFormData = z.infer<typeof studentSchema>;