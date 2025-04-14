// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const PasswordInput = ({...props}): React.JSX.Element => {
	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<div className="relative">
			<Input
				type={showPassword ? "text" : "password"}
				placeholder="••••••••••••"
				{...props}
			/>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="absolute right-0 top-0 hover:bg-transparent"
				onClick={() => setShowPassword(!showPassword)}
			>
				{showPassword ? (
					<EyeOff className="w-4 h-4" />
				) : (
					<Eye className="w-4 h-4" />
				)}
			</Button>
		</div>
	);
};
