import Form from "./form";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 pb-0">
			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
				<p className="w-auto rounded-xl border  border-b border-gray-300 bg-gray-200 bg-gradient-to-b from-zinc-200 p-4  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:bg-zinc-800/30 dark:from-inherit">
					Goconnect Chat SMS
				</p>

				<div className="clear-both"></div>
				<div className="p-10">
					Please provide a date and time when you would like to schedule the installation.
				</div>

				<div className="comment-wrapper">
					{/* <div className="answer m-5 rounded-xl border border-b  border-gray-300 bg-gray-200 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:bg-zinc-800/30 dark:from-inherit">
						<p>
							<b>Chat:</b>
						</p>
						<p>Lorem ipsum</p>
					</div>
					<div className="answer m-5 rounded-xl border border-b  border-gray-300 bg-gray-200 bg-gradient-to-b from-zinc-200 p-4 text-right  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:bg-zinc-800/30 dark:from-inherit">
						<p>
							<b>Client:</b>
						</p>
						<p>Lorem ipsum</p>
					</div> */}
				</div>
				<Form />
			</div>
		</main>
	);
}
