"use client";
import { type FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Form() {
	const [message, setMessage] = useState("");
	const [url, setUrl] = useState("");
	const [userId, setUserId] = useState("");

	if (url === "") {
		setUrl("https://d541-91-233-251-217.ngrok-free.app/api/chat");
		setUserId(uuidv4());
	}

	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		// https://d541-91-233-251-217.ngrok-free.app/api/chat
		const formData = new FormData(event.currentTarget);
		const request = { message: formData.get("message"), user_id: formData.get("user_id") };
		const url = formData.get("url");
		if (url !== null) {
			const commentsList = document.querySelector(".comment-wrapper");
			const comment = document.createElement("div");
			comment.innerHTML =
				`
			<div class="answer m-5 text-right rounded-xl border border-b  border-gray-300 bg-gray-200 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:bg-zinc-800/30 dark:from-inherit">
				<p>
					<b>Client:</b>
				</p>
				<p>` +
				formData.get("message")?.toString() +
				`</p>
			</div>
			
			`;

			setMessage("");

			commentsList?.append(comment);
			const response = await fetch(url.toString(), {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			});

			if (response.ok) {
				const data = (await response.json()) as { Response: string };

				const commentResponse = document.createElement("div");

				commentResponse.innerHTML =
					`
			<div class="answer m-5 rounded-xl border border-b  border-gray-300 bg-gray-200 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:bg-zinc-800/30 dark:from-inherit">
			<p>
				<b>Chat:</b>
			</p>
			<p>` +
					data.Response +
					`</p>
			</div>

			`;

				commentsList?.append(commentResponse);
			}
		}
	}

	return (
		<div className="p-15 bg-gray-100 pl-0">
			<form onSubmit={onSubmit}>
				<p className="p-2">
					<label>Message:</label>
					<input
						type="text"
						name="message"
						className="w-9/12"
						id="message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</p>

				<p className="p-2">
					<label>Url:</label>
					<input
						type="text"
						name="url"
						id="url"
						className="w-6/12"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
				</p>
				<input type="hidden" name="user_id" value={userId} />

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
