import type { UIMessage } from "ai";

import { EmptyChat } from "./empty-chat";
import { ChatMessage } from "./chat-message";

export function ChatPanel({
	messages,
	status,
	input,
	onInputChange,
	onSubmit,
	onQuestion,
}: {
	messages: UIMessage[];
	status: string;
	input: string;
	onInputChange: (value: string) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	onQuestion: (question: string) => void;
}) {
	return (
		<aside className="flex h-162.5 min-h-0 flex-col rounded-2xl border bg-white shadow-sm">
			<div className="border-b p-5">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
						AI
					</div>

					<div>
						<h2 className="font-semibold text-gray-900">Proposal Copilot</h2>
						<p className="text-sm text-gray-500">Ask about your proposals</p>
					</div>
				</div>
			</div>

			<div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
				{messages.length === 0 && <EmptyChat onQuestion={onQuestion} />}

				{messages.map((message) => (
					<ChatMessage key={message.id} message={message} />
				))}
			</div>

			{status === "submitted" && (
				<div className="flex justify-start px-5 pb-2">
					<div className="rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-500">
						Checking your proposals...
					</div>
				</div>
			)}

			{status === "streaming" && (
				<div className="flex justify-start px-5 pb-2">
					<div className="rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-500">
						Thinking...
					</div>
				</div>
			)}

			<form onSubmit={onSubmit} className="border-t p-4">
				<div className="flex gap-2">
					<input
						value={input}
						onChange={(event) => onInputChange(event.target.value)}
						placeholder="Ask about your proposals..."
						disabled={status !== "ready"}
						className="min-w-0 flex-1 rounded-lg border px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-500 disabled:cursor-not-allowed disabled:bg-gray-50"
					/>

					<button
						type="submit"
						disabled={status !== "ready" || !input.trim()}
						className="rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
					>
						Send
					</button>
				</div>

				<div className="mt-2 text-xs text-gray-400">Powered by Gemini</div>
			</form>
		</aside>
	);
}
