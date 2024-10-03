// lib/validationSchemas.ts
import { z } from 'zod';

const usernameSchema = z.string()
  .min(1, { message: "Username is required" })
  .max(20, { message: "Username must be at most 20 characters long"})
  .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" });

const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .max(254, { message: "Email must be at most 254 characters long" })
  .email({ message: "Invalid email address" });

const passwordSchema = z
  .string()
  .min(1, { message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters" })
  .max(64, { message: "Password must be at most 64 characters long" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[\W_]/, { message: "Password must contain at least one special character" });

const confirmPasswordSchema = z
  .string()
  .min(1, { message: "Confirm password is required" })
  .min(8, { message: "Confirm password must be at least 8 characters" })
  .max(64, { message: "Confirm password must be at most 64 characters long" });

// Define a schema for a single character (uppercase letter or digit)
const singleCharSchema = z
  .string();

// Define the full schema for the verification code (array of 6 characters)
export const verificationCodeSchema = z.object({
  codeChar1: singleCharSchema,
  codeChar2: singleCharSchema,
  codeChar3: singleCharSchema,
  codeChar4: singleCharSchema,
  codeChar5: singleCharSchema,
  codeChar6: singleCharSchema,
}).refine(data => {
    const values = Object.values(data);
    return values.every(value => value.length === 1);  // All inputs must be exactly one character
  }, {
    message: "Verification code must be exactly 6 characters",
    path: ["verificationCode"], // This is a generic path. You can set this to any specific field if needed.
})
// Second refine: Regex check to validate uppercase letters and digits
.refine((data) => {
    const values = Object.values(data);
    return values.every(value => /^[A-Z0-9]$/.test(value));
  }, {
    message: "Verification code must only contain alphanumeric characters",
    path: ["verificationCode"], // You can associate the error with any path or leave generic.
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});