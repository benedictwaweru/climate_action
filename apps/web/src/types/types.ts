// ---------------------------------------------------------------------------------
// Copyright 2025 Benedict Waweru
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ---------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------
// Define types and schemas here
// ---------------------------------------------------------------------------------

import { z } from "zod";

export const signupSchema = z
	.object({
		fullName: z
			.string()
			.refine((val) => val !== "", { message: `Please enter your name` }),
		email: z.string().email({ message: `Please enter a valid email address` }),
		password: z
			.string()
			.min(12, `Password must be at least 12 characters long`)
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{12,}$/,
				`Password should contain uppercase, lowercase, special characters and digits`,
			),
		confirmPassword: z.string(),
		acceptTerms: z
			.boolean()
			.refine((val) => val === true, {
				message: `You must accept terms and conditions`,
			}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: `Passwords do not match`,
		path: ["confirmPassword"],
	});

export const loginSchema = z.object({
	email: z.string().email({ message: `Please enter a valid email address` }),
	password: z.string().min(12, `Password must be at least 12 characters long`),
	rememberMe: z.boolean(),
});

export type TSignupSchema = z.infer<typeof signupSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
