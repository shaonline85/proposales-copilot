const quickQuestions = [
	"Which proposals are active?",
	"Which proposals need my attention?",
	"Tell me about Stockholm Summit",
];

export function EmptyChat({
	onQuestion,
}: {
	onQuestion: (question: string) => void;
}) {
	return (
		<div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
			<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-700">
				AI
			</div>

			<h3 className="mt-4 font-semibold text-gray-900">How can I help?</h3>

			<p className="mt-2 max-w-xs text-sm text-gray-500">
				Ask me about your proposals, pipeline or follow-ups.
			</p>

			<div className="mt-6 flex max-w-sm flex-wrap justify-center gap-2">
				{quickQuestions.map((question) => (
					<button
						key={question}
						type="button"
						onClick={() => onQuestion(question)}
						className=" rounded-full border bg-white px-3 py-2 text-xs text-gray-700 transition hover:bg-gray-50 hover:cursor-pointer"
					>
						{question}
					</button>
				))}
			</div>
		</div>
	);
}
