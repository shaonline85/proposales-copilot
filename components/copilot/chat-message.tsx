import type { UIMessage } from "ai";

export function ChatMessage({ message }: { message: UIMessage }) {
	const isUser = message.role === "user";

	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
			<div
				className={[
					"max-w-[85%] rounded-2xl px-4 py-3 text-sm",
					isUser ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900",
				].join(" ")}
			>
				{message.parts?.map((part, index) => {
					if (part.type === "text") {
						return (
							<div
								key={`${message.id}-${index}`}
								className="whitespace-pre-wrap leading-6"
							>
								{part.text}
							</div>
						);
					}

					return null;
				})}
			</div>
		</div>
	);
}
