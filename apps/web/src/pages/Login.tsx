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

import * as React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import axios from "axios";

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

import { loginSchema, TLoginSchema } from "@/types/types";

export default function LoginForm(): React.JSX.Element {
	const loginForm = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	const onSubmit = async (data: TLoginSchema) => {
		const response = await axios.post("/login", data);

		localStorage.setItem("token", response.data.token);
	};

	return (
		<div className="flex justify-center items-center h-lvh">
			<Form {...loginForm}>
				<form className="w-96" onSubmit={loginForm.handleSubmit(onSubmit)}>
					<div className="w-full place-items-center my-4">
						<h1 className="text-2xl font-bold">Log In</h1>
					</div>

					<FormField
						control={loginForm.control}
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
						control={loginForm.control}
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

					<div className="flex justify-between my-2">
						<div className="flex space-x-2 items-center">
							<Checkbox
								id="remember-me"
								checked={loginForm.watch("rememberMe")}
								onCheckedChange={(value) =>
									loginForm.setValue("rememberMe", Boolean(value))
								}
								{...loginForm.register("rememberMe")}
							/>
							<Label className="text-xs font-semibold" htmlFor="remember-me">
								Remember me
							</Label>
						</div>
						<Link
							className="text-blue-500 text-xs font-semibold hover:underline"
							to="/forgot-password"
						>
							Forgot password?
						</Link>
					</div>

					<Button
						type="submit"
						className="w-full my-4 bg-blue-500 cursor-pointer hover:bg-blue-700 disabled:bg-gray-800"
						disabled={loginForm.formState.isSubmitting}
					>
						{loginForm.formState.isSubmitting && (
							<LoaderCircle className="w-4 h-4 animate-spin" />
						)}
						{!loginForm.formState.isSubmitting && `Log in`}
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
							Don&apos;t have an account?{" "}
							<Link className="text-blue-500 hover:underline" to={`/signup`}>
								Create one
							</Link>
						</p>
					</div>
				</form>
			</Form>
		</div>
	);
}
