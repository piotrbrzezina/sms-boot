"use client";
import { type FormEvent } from "react";

export default function Form() {
	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		// https://d541-91-233-251-217.ngrok-free.app/api/chat
		const formData = new FormData(event.currentTarget);
		const request = { message: formData.get("message") };
		const url = formData.get("url");
		if (url !== null) {
			const response = await fetch(url.toString(), {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			});

			if (response.ok) {
				const data = (await response.json()) as { message: string };

				console.log(data);
			}
		}
	}

	return (
		<div className="p-5 pl-0">
			<form onSubmit={onSubmit}>
				<p className="p-2">
					<label>Message:</label>
					<input type="text" name="message" className="w-96" />
				</p>
				<p className="p-2">
					<label>Url:</label>
					<input
						type="text"
						name="url"
						value="https://d541-91-233-251-217.ngrok-free.app/api/chat"
					/>
				</p>

				<p className="pt-2">
					<button
						type="submit"
						className="mb-1 mr-1 rounded border border-gray-100 px-4 py-2 text-xs font-bold uppercase text-gray-800 outline-none transition-all duration-150 ease-linear hover:bg-green-950 hover:text-white focus:outline-none "
					>
						Send message &raquo;
					</button>
				</p>
			</form>
		</div>
	);
}
