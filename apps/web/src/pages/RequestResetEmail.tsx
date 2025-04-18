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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RequestResetEmail(): React.JSX.Element {
	const requestResetEmailFormSchema = z.object({
		email: z.string().email({ message: `Please enter a valid email address` }),
		resetType: z.enum(["Authenticator", "Reset Code"], {
			errorMap: () => ({ message: `Please select one` }),
		}),
	});

	type TRequestResetEmailFormSchema = z.infer<
		typeof requestResetEmailFormSchema
	>;

	const requestResetEmailForm = useForm<TRequestResetEmailFormSchema>({
		resolver: zodResolver(requestResetEmailFormSchema),
		defaultValues: {
			email: "",
			resetType: undefined,
		},
	});

	const onSubmit = async () => {};

	return (
		<div className="flex justify-center items-center h-lvh">
			<Form {...requestResetEmailForm}>
				<form
					className="w-96"
					onSubmit={requestResetEmailForm.handleSubmit(onSubmit)}
				>
					<div className="w-full place-items-center my-4">
						<h1 className="text-2xl font-bold">Reset Password</h1>
					</div>

					<FormField
						control={requestResetEmailForm.control}
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

					<RadioGroup
						className="flex my-2 justify-around"
						{...requestResetEmailForm.register("resetType")}
						onValueChange={(value) =>
							requestResetEmailForm.setValue(
								"resetType",
								value as "Authenticator" | "Reset Code",
							)
						}
					>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="Authenticator"
								id="authenticator-radio-option"
							/>
							<Label className="text-xs" htmlFor="authenticator-radio-option">
								Authenticator
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="Reset Code" id="reset-code-radio-option" />
							<Label className="text-xs" htmlFor="reset-code-radio-option">
								Reset Code
							</Label>
						</div>
					</RadioGroup>
					{requestResetEmailForm.formState.errors.resetType && (
						<p className="text-red-500 text-xs mt-1">
							{requestResetEmailForm.formState.errors.resetType.message}
						</p>
					)}

					<div className="flex w-full justify-between items-center">
						<Button variant="secondary">Cancel</Button>
						<Button
							type="submit"
							className="my-4 bg-blue-500 cursor-pointer hover:bg-blue-700 disabled:bg-gray-800"
							variant="default"
							disabled={requestResetEmailForm.formState.isSubmitting}
						>
							Submit
							<Send />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
