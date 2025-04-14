// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginForm from "@/pages/Login";
import SignupForm from "@/pages/Signup";

const queryClient = new QueryClient();

export default function App(): React.JSX.Element {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route />
					<Route path="/login" element={<LoginForm />} />
					<Route path="/signup" element={<SignupForm />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
