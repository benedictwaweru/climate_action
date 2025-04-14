// ---------------------------------------------------------------------------------
// Define types and schemas here
// ---------------------------------------------------------------------------------

import { z } from "zod";

export const signupSchema = z.object({
	fullName: z.string().refine(val => val !== "", { message: `Please enter your name` }),
	email: z.string().email({ message: `Please enter a valid email address` }),
	password: z
		.string()
		.min(12, `Password must be at least 12 characters long`)
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{12,}$/,
			`Password should contain uppercase, lowercase, special characters and digits`
		),
	confirmPassword: z.string(),
	acceptTerms: z.boolean().refine(val => val === true, { message: `You must accept terms and conditions` })
}).refine(
	data => data.password === data.confirmPassword,
	{ message: `Passwords do not match`, path: ["confirmPassword"] }
);

export const loginSchema = z.object({
	email: z.string().email({ message: `Please enter a valid email address` }),
	password: z
		.string()
		.min(12, `Password must be at least 12 characters long`),
	rememberMe: z.boolean()
});

export type TSignupSchema = z.infer<typeof signupSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
