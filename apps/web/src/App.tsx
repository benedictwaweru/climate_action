// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from "@/pages/Login";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route />
				<Route path="/login" element={<LoginForm />} />
				<Route />
			</Routes>
		</BrowserRouter>
	);
}
