import { FormEvent } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
	const router = useRouter();

	async function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");

		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			router.push("/");
		} else {
			alert("Error login");
		}
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-xl shadow-md w-80"
			>
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Login
				</button>
			</form>
		</div>
	);
}
