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

//import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

import { GoogleIcon, MicrosoftIcon } from "@/components/common/Icons";
import { PasswordInput } from "@/components/common/PasswordInput";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { signupSchema, TSignupSchema } from "@/types/types";

export default function SignupForm() {
	const signupForm = useForm<TSignupSchema>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
			acceptTerms: false,
		},
	});

	const onSubmit = async (data: TSignupSchema) => {
		console.log(data);
	};

	return (
		<div className="flex justify-center items-center h-lvh">
			<Form {...signupForm}>
				<form className="w-96" onSubmit={signupForm.handleSubmit(onSubmit)}>
					<div className="w-full place-items-center my-4">
						<h1 className="text-2xl font-bold">Create an account</h1>
					</div>

					<FormField
						control={signupForm.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs font-semibold mt-2">
									Full name <span className="text-red-500">*</span>
								</FormLabel>

								<FormControl>
									<Input
										type="text"
										placeholder="John Smith"
										autoCapitalize="on"
										autoCorrect="off"
										spellCheck="false"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-xs" />
							</FormItem>
						)}
					/>
					<FormField
						control={signupForm.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs font-semibold mt-2">
									Email <span className="text-red-500">*</span>
								</FormLabel>

								<FormControl>
									<Input
										type="email"
										placeholder="yourname@example.com"
										autoCapitalize="off"
										autoCorrect="off"
										spellCheck="false"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-xs" />
							</FormItem>
						)}
					/>
					<FormField
						control={signupForm.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs font-semibold mt-2">
									Password <span className="text-red-500">*</span>
								</FormLabel>

								<FormControl>
									<PasswordInput {...field} />
								</FormControl>
								<FormMessage className="text-xs" />
							</FormItem>
						)}
					/>
					<FormField
						control={signupForm.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs font-semibold mt-2">
									Confirm password <span className="text-red-500">*</span>
								</FormLabel>

								<FormControl>
									<PasswordInput {...field} />
								</FormControl>
								<FormMessage className="text-xs" />
							</FormItem>
						)}
					/>

					<div className="flex my-2 space-x-2 items-center">
						<Checkbox
							id="accept-terms"
							checked={signupForm.watch("acceptTerms")}
							onCheckedChange={(value) =>
								signupForm.setValue("acceptTerms", Boolean(value))
							}
							{...signupForm.register("acceptTerms")}
						/>
						<Label className="text-xs font-semibold" htmlFor="accept-terms">
							Agree to our
							<Link
								className="text-blue-500 hover:underline"
								to="/terms-of-service"
							>
								Terms of Service
							</Link>
						</Label>
					</div>

					{signupForm.formState.errors.acceptTerms && (
						<p className="text-red-500 text-xs mt-1">
							{signupForm.formState.errors.acceptTerms.message}
						</p>
					)}

					<Button
						type="submit"
						className="w-full my-4 bg-blue-500 cursor-pointer hover:bg-blue-700 disabled:bg-gray-800"
						disabled={signupForm.formState.isSubmitting}
					>
						{signupForm.formState.isSubmitting && (
							<LoaderCircle className="w-4 h-4 animate-spin" />
						)}
						{!signupForm.formState.isSubmitting && `Create`}
					</Button>

					<Separator className="my-4" />

					<div className="flex flex-col items-center">
						<p className="text-xs font-light place-items-center my-2">
							Or continue with?
						</p>

						<div className="flex space-x-12">
							<Button
								className="text-xs shadow-sm cursor-pointer hover:scale-110"
								variant="secondary"
								size="default"
							>
								<GoogleIcon /> Google
							</Button>
							{/* <Button
								className="text-xs shadow-sm cursor-pointer hover:scale-110"
								variant="secondary"
								size="default"
							>
								<AppleBlackIcon /> Apple
							</Button> */}
							<Button
								className="text-xs shadow-sm cursor-pointer hover:scale-110"
								variant="secondary"
								size="default"
							>
								<MicrosoftIcon /> Microsoft
							</Button>
						</div>

						<p className="my-4 text-xs">
							Already have an account?{" "}
							<Link className="text-blue-500 hover:underline" to={`/login`}>
								Log in
							</Link>
						</p>
					</div>
				</form>
			</Form>
		</div>
	);
}
