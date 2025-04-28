import { z } from 'zod';
import { StatusEnum } from '../types/statusTypes';

// Define the Zod schema for validation
export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  status: z.nativeEnum(StatusEnum), // Use the enum for validation
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .refine(
      (dob) => {
        const dobDate = new Date(dob);
        const currentDate = new Date();
        const minDate = new Date('1900-01-01');

        return dobDate <= currentDate && dobDate >= minDate;
      },
      {
        message: 'Date of birth must be between January 1, 1900, and today.',
      }
    ),
});

// Infer the type from the schema
export type FormData = z.infer<typeof userSchema>;